import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AccountsModule } from './modules/accounts/accounts.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CurrenciesModule } from './modules/currencies/currencies.module';
import { ExchangeRatesModule } from './modules/exchange-rates/exchange-rates.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    AccountsModule,
    AuthModule,
    CategoriesModule,
    CurrenciesModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ExchangeRatesModule,
    UsersModule,
    TransactionsModule,
  ],
})
export class AppModule {}
