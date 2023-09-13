import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';
import { ExchangeRateEntity } from './entities/exchange-rate.entity';
import { ExchangeRateNotFoundException } from './exceptions/exchange-rate-not-found.exception';

@Injectable()
export class ExchangeRatesService {
  private readonly exchangeRates;
  private readonly include: Prisma.ExchangeRateInclude = {
    fromCurrency: true,
    toCurrency: true,
  };

  constructor(private readonly prismaService: PrismaService) {
    this.exchangeRates = this.prismaService.exchangeRate;
  }

  async findAll() {
    const exchangeRates = await this.exchangeRates.findMany({
      include: this.include,
    });

    return exchangeRates.map(
      (exchangeRate) => new ExchangeRateEntity(exchangeRate),
    );
  }

  async findOne(id: number) {
    const exchangeRate = await this.exchangeRates.findUnique({
      where: { id },
      include: this.include,
    });
    if (!exchangeRate) throw new ExchangeRateNotFoundException();

    return new ExchangeRateEntity(exchangeRate);
  }

  async update(id: number, dto: UpdateExchangeRateDto) {
    const updated = await this.exchangeRates.update({
      where: { id },
      data: dto,
      include: this.include,
    });

    return new ExchangeRateEntity(updated);
  }
}
