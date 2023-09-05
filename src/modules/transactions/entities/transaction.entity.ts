import { Transaction, TransactionType } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { AccountEntity } from 'src/modules/accounts/entities/account.entity';
import { CategoryEntity } from 'src/modules/categories/entities/category.entity';

export class TransactionEntity implements Transaction {
  id: number;
  type: TransactionType;
  amount: number;
  reason: string;

  @Exclude()
  categoryId: number | null;

  @Exclude()
  accountId: number;

  account?: AccountEntity;
  category?: CategoryEntity | null;
  createdAt: Date;
  updatedAt: Date;

  constructor({ account, category, ...data }: Partial<TransactionEntity>) {
    Object.assign(this, data);

    if (account) this.account = new AccountEntity(account);
    if (category) this.category = new CategoryEntity(category);
  }
}
