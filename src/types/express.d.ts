import { AccountEntity } from 'src/modules/accounts/entities/account.entity';
import { CategoryEntity } from 'src/modules/categories/entities/category.entity';

declare module 'express' {
  interface Request {
    userId?: number;
    account?: AccountEntity;
    category?: CategoryEntity;
  }
}

export { };

