import { Transaction, TransactionType } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { AccountEntity } from 'src/resources/accounts/entities/account.entity';
import { CategoryEntity } from 'src/resources/categories/entities/category.entity';

export class TransactionEntity implements Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  reason: string;

  @Exclude()
  categoryId: number | null;

  @Exclude()
  accountId: number;

  createdAt: Date;
  updatedAt: Date;

  account?: AccountEntity;
  category?: CategoryEntity | null;

  constructor({ account, category, ...data }: Partial<TransactionEntity>) {
    Object.assign(this, data);

    if (account) this.account = new AccountEntity(account);
    if (category) this.category = new CategoryEntity(category);
  }
}
