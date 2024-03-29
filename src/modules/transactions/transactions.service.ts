import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Prisma, TransactionType } from '@prisma/client';
import { AccountsService } from '../accounts/accounts.service';
import { CategoriesService } from '../categories/categories.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionEntity } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  private readonly transactions;
  private readonly include: Prisma.TransactionInclude = {
    account: { include: { currency: true } },
    category: true,
  };

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
    const category = categoryId
      ? await this.categoriesService.findOne(categoryId)
      : undefined;
    const transaction = await this.transactions.create({
      data: {
        type,
        account: { connect: { id: account.id } },
        amount,
        reason,
        ...(category && { category: { connect: { id: category.id } } }),
      },
      include: this.include,
    });

    return new TransactionEntity(transaction);
  }

  async findAll(userId: string) {
    const transactions = await this.transactions.findMany({
      where: { account: { userId } },
      include: this.include,
      orderBy: { updatedAt: 'desc' },
    });

    return transactions.map(
      (transaction) => new TransactionEntity(transaction),
    );
  }

  async findOne(id: string) {
    const transaction = await this.transactions.findUnique({
      where: { id },
      include: this.include,
    });
    if (!transaction) throw new Error();

    return new TransactionEntity(transaction);
  }

  async balances(accountIds: string[]): Promise<Record<string, number>> {
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

  async balanceOf(accountId: string) {
    const [incomes, outcomes] = await Promise.all([
      this.transactions.aggregate({
        where: { accountId, type: TransactionType.INCOME },
        _sum: { amount: true },
      }),
      this.transactions.aggregate({
        where: { accountId, type: TransactionType.OUTCOME },
        _sum: { amount: true },
      }),
    ]);

    return (incomes?._sum?.amount ?? 0) - (outcomes?._sum?.amount ?? 0);
  }

  async update(id: string, dto: UpdateTransactionDto) {
    const updated = await this.transactions.update({
      where: { id },
      data: dto,
      include: this.include,
    });

    return new TransactionEntity(updated);
  }

  async remove(id: string) {
    await this.transactions.delete({ where: { id } });
  }
}
