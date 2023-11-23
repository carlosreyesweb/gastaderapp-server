import { ExchangeRate } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { CurrencyEntity } from 'src/modules/currencies/entities/currency.entity';

export class ExchangeRateEntity implements ExchangeRate {
  id: string;
  rate: number;

  @Exclude()
  fromCurrencyId: string;

  @Exclude()
  toCurrencyId: string;

  fromCurrency?: CurrencyEntity;
  toCurrency?: CurrencyEntity;
  createdAt: Date;
  updatedAt: Date;

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
