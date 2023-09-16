import { AccountEntity } from 'src/modules/accounts/entities/account.entity';
import { CategoryEntity } from 'src/modules/categories/entities/category.entity';
import { TransactionEntity } from 'src/modules/transactions/entities/transaction.entity';

declare module 'express' {
  interface Request {
    userId?: number;
    account?: AccountEntity;
    category?: CategoryEntity;
    transaction?: TransactionEntity;
  }
}

export { };

