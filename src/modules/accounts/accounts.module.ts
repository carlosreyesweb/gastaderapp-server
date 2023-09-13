import { Module, forwardRef } from '@nestjs/common';
import { CurrenciesModule } from '../currencies/currencies.module';
import { PrismaModule } from '../prisma/prisma.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

@Module({
  imports: [
    PrismaModule,
    CurrenciesModule,
    forwardRef(() => TransactionsModule),
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
