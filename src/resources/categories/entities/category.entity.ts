import { Category } from '@prisma/client';
import { TransactionEntity } from 'src/resources/transactions/entities/transaction.entity';

export class CategoryEntity implements Category {
  id: number;
  name: string;
  description: string | null;
  color: string | null;

  transactions?: TransactionEntity[];

  constructor({ transactions, ...partial }: Partial<CategoryEntity>) {
    Object.assign(this, partial);

    if (transactions) {
      this.transactions = transactions.map(
        (transaction) => new TransactionEntity(transaction),
      );
    }
  }
}
