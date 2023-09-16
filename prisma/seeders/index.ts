import { PrismaClient } from '@prisma/client';
import { seedAccounts } from './accounts';
import { seedCategories } from './categories';
import { seedCurrencies } from './currencies';
import { seedExchangeRates } from './exchange-rates';
import { seedUsers } from './users';

async function seed() {
  const client = new PrismaClient();

  console.log('----> Seeding database...');

  await seedUsers(client);
  await seedCurrencies(client);
  await seedAccounts(client);
  await seedCategories(client);
  await seedExchangeRates(client);

  console.log('----> Database seeded!');
}

seed();
