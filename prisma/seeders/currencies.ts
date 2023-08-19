import { Prisma, PrismaClient } from '@prisma/client';

export async function seedCurrencies(client: PrismaClient) {
  const currencies: Prisma.CurrencyCreateManyInput[] = [
    {
      id: 1,
      name: 'Dólar estadounidense',
      symbol: 'USD',
      icon: 'fa-dollar-sign',
    },
    {
      id: 2,
      name: 'Bolivar Soberano Venezolano',
      symbol: 'VES',
      icon: 'fa-money-bill-alt',
    },
    {
      id: 3,
      name: 'Euro',
      symbol: 'EUR',
      icon: 'fa-euro-sign',
    },
  ];

  console.log('-> Seeding currencies...');
  await client.currency.createMany({ data: currencies });
}
