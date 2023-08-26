import { Prisma, PrismaClient } from '@prisma/client';

export async function seedAccounts(client: PrismaClient) {
  const accounts: Prisma.AccountCreateManyInput[] = [
    {
      id: 1,
      name: 'Corriente Mercantil',
      accountNumber: '0105-0001-21-1000000000',
      currencyId: 2,
      userId: 1,
      balance: 5000,
    },
    {
      id: 2,
      name: 'Facebank International',
      accountNumber: '37100284',
      currencyId: 1,
      userId: 1,
    },
    {
      id: 3,
      name: 'Binance',
      accountNumber: '0x3364763dggfyudgfy',
      currencyId: 1,
      userId: 1,
    },
    {
      id: 4,
      name: 'Zinli',
      accountNumber: 'payments.gabo@gmail.com',
      currencyId: 1,
      userId: 1,
    },
  ];

  console.log('-> Seeding accounts...');
  await client.account.createMany({ data: accounts });
}
