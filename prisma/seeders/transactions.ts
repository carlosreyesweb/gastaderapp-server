import { Prisma, PrismaClient } from '@prisma/client';

export async function seedTransactions(client: PrismaClient) {
  const transactions: Prisma.TransactionCreateManyInput[] = [
    {
      id: 1,
      type: 'INCOME',
      amount: 10000,
      reason: 'Venta de zapatos',
      accountId: 1,
      categoryId: 1,
    },
    {
      id: 2,
      type: 'OUTCOME',
      amount: 5000,
      reason: 'Pago de gasolina',
      accountId: 1,
      categoryId: 2,
    },
  ];

  console.log('-> Seeding transactions...');
  await client.transaction.createMany({ data: transactions });
}
