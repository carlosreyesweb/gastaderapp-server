import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { DatabaseModule } from './database/database.module';
import { AccountsModule } from './resources/accounts/accounts.module';
import { AuthModule } from './resources/auth/auth.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { CurrenciesModule } from './resources/currencies/currencies.module';
import { ExchangeRatesModule } from './resources/exchange-rates/exchange-rates.module';
import { TransactionsModule } from './resources/transactions/transactions.module';
import { UsersModule } from './resources/users/users.module';

@Module({
  imports: [
    UsersModule,
    CurrenciesModule,
    AccountsModule,
    CategoriesModule,
    TransactionsModule,
    ExchangeRatesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule {}
