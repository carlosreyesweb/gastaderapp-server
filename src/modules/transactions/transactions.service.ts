import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { CategoriesService } from '../categories/categories.service';
import { CategoryEntity } from '../categories/entities/category.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionsRepository } from './transactions.repository';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly categoriesService: CategoriesService,
    @Inject(forwardRef(() => AccountsService))
    private readonly accountsService: AccountsService,
  ) {}

  async create(dto: CreateTransactionDto) {
    const { type, accountId, amount, reason, categoryId } = dto;

    const account = await this.accountsService.findOne(accountId);

    let category: CategoryEntity | undefined;
    if (categoryId) {
      category = await this.categoriesService.findOne(categoryId);
    }

    const transaction = await this.transactionsRepository.create({
      type,
      account: { connect: { id: account.id } },
      amount,
      reason,
      category: { connect: { id: category?.id } },
    });

    return new TransactionEntity(transaction);
  }

  async findAll() {
    const transactions = await this.transactionsRepository.findAll();

    return transactions.map(
      (transaction) => new TransactionEntity(transaction),
    );
  }

  async findOne(id: number) {
    const transaction = await this.transactionsRepository.findOne(id);
    if (!transaction) throw new Error();

    return new TransactionEntity(transaction);
  }

  async update(id: number, dto: UpdateTransactionDto) {
    const updated = await this.transactionsRepository.update(id, dto);

    return new TransactionEntity(updated);
  }

  async remove(id: number) {
    await this.transactionsRepository.remove(id);
  }
}
