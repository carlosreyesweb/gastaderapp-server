import { Injectable } from '@nestjs/common';
import { UpdateExchangeRateDto } from './dto/update-exchange-rate.dto';
import { ExchangeRateEntity } from './entities/exchange-rate.entity';
import { ExchangeRateNotFoundException } from './exceptions/exchange-rate-not-found.exception';
import { ExchangeRatesRepository } from './exchange-rates.repository';

@Injectable()
export class ExchangeRatesService {
  constructor(
    private readonly exchangeRatesRepository: ExchangeRatesRepository,
  ) {}

  async findAll() {
    const exchangeRates = await this.exchangeRatesRepository.findAll();

    return exchangeRates.map(
      (exchangeRate) => new ExchangeRateEntity(exchangeRate),
    );
  }

  async findOne(id: number) {
    const exchangeRate = await this.exchangeRatesRepository.findOne(id);
    if (!exchangeRate) throw new ExchangeRateNotFoundException();

    return new ExchangeRateEntity(exchangeRate);
  }

  async update(id: number, dto: UpdateExchangeRateDto) {
    const updated = await this.exchangeRatesRepository.update(id, dto);

    return new ExchangeRateEntity(updated);
  }
}
