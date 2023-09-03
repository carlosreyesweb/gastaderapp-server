import { Prisma, PrismaClient } from '@prisma/client';

export async function seedCategories(client: PrismaClient) {
  const categories: Prisma.CategoryCreateManyInput[] = [
    {
      id: 1,
      name: 'Comida',
      userId: 1,
    },
    {
      id: 2,
      name: 'Transporte',
      userId: 1,
    },
    {
      id: 3,
      name: 'Servicios',
      userId: 1,
    },
    {
      id: 4,
      name: 'Entretenimiento',
      userId: 1,
    },
    {
      id: 5,
      name: 'Salud',
      userId: 1,
    },
    {
      id: 6,
      name: 'Educación',
      userId: 1,
    },
  ];

  console.log('-> Seeding categories...');
  await client.category.createMany({ data: categories });
}
