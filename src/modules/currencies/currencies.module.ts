import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesRepository } from './currencies.repository';
import { CurrenciesService } from './currencies.service';

@Module({
  imports: [PrismaModule],
  controllers: [CurrenciesController],
  providers: [CurrenciesRepository, CurrenciesService],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
