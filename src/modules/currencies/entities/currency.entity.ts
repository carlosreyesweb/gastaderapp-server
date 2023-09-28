import { Currency } from '@prisma/client';
export class CurrencyEntity implements Currency {
  id: number;
  name: string;
  symbol: string;
  createdAt: Date;

  constructor(partial: Partial<CurrencyEntity>) {
    Object.assign(this, partial);
  }
}
