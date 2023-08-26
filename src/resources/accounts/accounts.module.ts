import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CurrenciesModule } from '../currencies/currencies.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { UsersModule } from '../users/users.module';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

@Module({
  imports: [AuthModule, UsersModule, CurrenciesModule, TransactionsModule],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
