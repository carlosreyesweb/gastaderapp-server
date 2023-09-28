import { Prisma, PrismaClient } from '@prisma/client';

export async function seedCurrencies(client: PrismaClient) {
  const currencies: Prisma.CurrencyCreateManyInput[] = [
    {
      name: 'Dólar estadounidense',
      symbol: 'USD',
    },
    {
      name: 'Bolivar Soberano Venezolano',
      symbol: 'VES',
    },
    {
      name: 'Euro',
      symbol: 'EUR',
    },
  ];

  console.log('-> Seeding currencies...');
  await client.currency.createMany({ data: currencies });
}
