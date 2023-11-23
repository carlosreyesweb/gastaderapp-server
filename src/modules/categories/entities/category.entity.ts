import { Category } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { TransactionEntity } from 'src/modules/transactions/entities/transaction.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class CategoryEntity implements Category {
  id: string;
  name: string;
  description: string | null;
  color: string | null;

  @Exclude()
  userId: string;

  user?: UserEntity;
  transactions?: TransactionEntity[];

  constructor({ transactions, user, ...partial }: Partial<CategoryEntity>) {
    Object.assign(this, partial);
    if (user) this.user = new UserEntity(user);
    if (transactions) {
      this.transactions = transactions.map(
        (transaction) => new TransactionEntity(transaction),
      );
    }
  }
}
