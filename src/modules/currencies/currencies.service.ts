import { Injectable } from '@nestjs/common';
import { CurrenciesRepository } from './currencies.repository';
import { CurrencyEntity } from './entities/currency.entity';
import { CurrencyNotFoundException } from './exceptions/currency-not-found.exception';

@Injectable()
export class CurrenciesService {
  constructor(private readonly currenciesRepository: CurrenciesRepository) {}

  async findAll() {
    const currencies = await this.currenciesRepository.findAll();

    return currencies.map((currency) => new CurrencyEntity(currency));
  }

  async findOne(id: number) {
    const currency = await this.currenciesRepository.findOne(id);
    if (!currency) throw new CurrencyNotFoundException();

    return new CurrencyEntity(currency);
  }
}
