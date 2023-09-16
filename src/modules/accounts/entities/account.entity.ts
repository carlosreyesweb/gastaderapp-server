import { Account } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { CurrencyEntity } from 'src/modules/currencies/entities/currency.entity';
import { TransactionEntity } from 'src/modules/transactions/entities/transaction.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class AccountEntity implements Account {
  id: number;
  name: string;
  accountNumber: string;
  balance?: number;
  color: string | null;

  @Exclude()
  currencyId: number;

  @Exclude()
  userId: number;

  currency?: CurrencyEntity;
  user?: UserEntity;
  transactions?: TransactionEntity[];
  createdAt: Date;
  updatedAt: Date;

  constructor({
    currency,
    user,
    transactions,
    ...partial
  }: Partial<AccountEntity>) {
    Object.assign(this, partial);

    if (user) this.user = new UserEntity(user);
    if (currency) this.currency = new CurrencyEntity(currency);
    if (transactions) {
      this.transactions = transactions.map(
        (transaction) => new TransactionEntity(transaction),
      );
    }
  }
}
