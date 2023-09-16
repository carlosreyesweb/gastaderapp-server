import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { TransactionType } from '@prisma/client';
import { AccountsService } from '../accounts/accounts.service';
import { CategoriesService } from '../categories/categories.service';
import { CategoryEntity } from '../categories/entities/category.entity';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionEntity } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  private readonly transactions;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly categoriesService: CategoriesService,
    @Inject(forwardRef(() => AccountsService))
    private readonly accountsService: AccountsService,
  ) {
    this.transactions = this.prismaService.transaction;
  }

  async create(dto: CreateTransactionDto) {
    const { type, accountId, amount, reason, categoryId } = dto;

    const account = await this.accountsService.findOne(accountId);

    let category: CategoryEntity | undefined;
    if (categoryId) {
      category = await this.categoriesService.findOne(categoryId);
    }

    const transaction = await this.transactions.create({
      data: {
        type,
        account: { connect: { id: account.id } },
        amount,
        reason,
        ...(category && { category: { connect: { id: category.id } } }),
      },
      include: { account: true, category: true },
    });

    return new TransactionEntity(transaction);
  }

  async findAll() {
    const transactions = await this.transactions.findMany({
      include: { account: true },
    });

    return transactions.map(
      (transaction) => new TransactionEntity(transaction),
    );
  }

  async findOne(id: number) {
    const transaction = await this.transactions.findUnique({
      where: { id },
      include: {
        category: true,
        account: true,
      },
    });
    if (!transaction) throw new Error();

    return new TransactionEntity(transaction);
  }

  async balances(accountIds: number[]): Promise<Record<number, number>> {
    const balances = await Promise.all(
      accountIds.map((accountId) => this.balanceOf(accountId)),
    );

    return balances.reduce((acc, balance, index) => {
      return {
        ...acc,
        [accountIds[index]]: balance,
      };
    }, {});
  }

  async balanceOf(accountId: number) {
    const {
      _sum: { amount: incomes },
    } = await this.transactions.aggregate({
      where: { accountId, type: TransactionType.INCOME },
      _sum: { amount: true },
    });

    const {
      _sum: { amount: outcomes },
    } = await this.transactions.aggregate({
      where: { accountId, type: TransactionType.OUTCOME },
      _sum: { amount: true },
    });

    return (incomes ?? 0) - (outcomes ?? 0);
  }

  async update(id: number, dto: UpdateTransactionDto) {
    const updated = await this.transactions.update({
      where: { id },
      data: dto,
      include: {
        category: true,
        account: true,
      },
    });

    return new TransactionEntity(updated);
  }

  async remove(id: number) {
    await this.transactions.delete({ where: { id } });
  }
}
