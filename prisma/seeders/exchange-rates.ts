import { Prisma, PrismaClient } from '@prisma/client';

export async function seedExchangeRates(client: PrismaClient) {
  const exchangeRates: Prisma.ExchangeRateCreateManyInput[] = [
    {
      id: 1,
      fromCurrencyId: 1,
      toCurrencyId: 2,
      rate: 3365,
    },
  ];

  console.log('-> Seeding exchange rates...');
  await client.exchangeRate.createMany({ data: exchangeRates });
}
