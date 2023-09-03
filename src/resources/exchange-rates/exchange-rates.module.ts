import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { ExchangeRatesController } from './exchange-rates.controller';
import { ExchangeRatesService } from './exchange-rates.service';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [ExchangeRatesController],
  providers: [ExchangeRatesService],
})
export class ExchangeRatesModule {}
