import { ExchangeRate } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { CurrencyEntity } from 'src/resources/currencies/entities/currency.entity';

export class ExchangeRateEntity implements ExchangeRate {
  id: number;
  rate: number;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  fromCurrencyId: number;

  @Exclude()
  toCurrencyId: number;

  fromCurrency?: CurrencyEntity;
  toCurrency?: CurrencyEntity;

  constructor({
    fromCurrency,
    toCurrency,
    ...partial
  }: Partial<ExchangeRateEntity>) {
    Object.assign(this, partial);

    if (fromCurrency) this.fromCurrency = new CurrencyEntity(fromCurrency);
    if (toCurrency) this.toCurrency = new CurrencyEntity(toCurrency);
  }
}
