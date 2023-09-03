import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class ExchangeRatesService {
  private readonly include: Prisma.ExchangeRateInclude = {
    fromCurrency: true,
    toCurrency: true,
  };

  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.exchangeRate.findMany({ include: this.include });
  }

  findOne(id: number) {
    return this.prismaService.exchangeRate.findUnique({
      where: { id },
      include: this.include,
    });
  }

  update(id: number, data: Prisma.ExchangeRateUpdateInput) {
    return this.prismaService.exchangeRate.update({
      where: { id },
      data,
      include: this.include,
    });
  }
}
