import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ExchangeRatesController } from './exchange-rates.controller';
import { ExchangeRatesRepository } from './exchange-rates.repository';
import { ExchangeRatesService } from './exchange-rates.service';

@Module({
  imports: [PrismaModule],
  controllers: [ExchangeRatesController],
  providers: [ExchangeRatesRepository, ExchangeRatesService],
  exports: [ExchangeRatesService],
})
export class ExchangeRatesModule {}
