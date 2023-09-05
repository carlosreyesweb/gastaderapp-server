import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaRepository } from '../prisma/prisma.repository';

@Injectable()
export class ExchangeRatesRepository {
  private readonly include: Prisma.ExchangeRateInclude = {
    fromCurrency: true,
    toCurrency: true,
  };

  constructor(private readonly prismaRepository: PrismaRepository) {}

  findAll(where?: Prisma.ExchangeRateWhereInput) {
    return this.prismaRepository.exchangeRate.findMany({
      where,
      include: this.include,
    });
  }

  findOne(id: number) {
    return this.prismaRepository.exchangeRate.findUnique({
      where: { id },
      include: this.include,
    });
  }

  update(id: number, data: Prisma.ExchangeRateUpdateInput) {
    return this.prismaRepository.exchangeRate.update({
      where: { id },
      data,
      include: this.include,
    });
  }
}
