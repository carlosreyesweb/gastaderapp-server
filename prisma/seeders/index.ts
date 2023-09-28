import { PrismaClient } from '@prisma/client';
import { seedCurrencies } from './currencies';
import { seedUsers } from './users';

async function seed() {
  const client = new PrismaClient();

  console.log('----> Seeding database...');

  await seedUsers(client);
  await seedCurrencies(client);

  console.log('----> Database seeded!');
}

seed();
