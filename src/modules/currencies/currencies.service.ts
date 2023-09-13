import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CurrencyEntity } from './entities/currency.entity';
import { CurrencyNotFoundException } from './exceptions/currency-not-found.exception';

@Injectable()
export class CurrenciesService {
  private readonly currencies;

  constructor(private readonly prismaService: PrismaService) {
    this.currencies = this.prismaService.currency;
  }

  async findAll() {
    const currencies = await this.currencies.findMany();

    return currencies.map((currency) => new CurrencyEntity(currency));
  }

  async findOne(id: number) {
    const currency = await this.currencies.findUnique({ where: { id } });
    if (!currency) throw new CurrencyNotFoundException();

    return new CurrencyEntity(currency);
  }
}
