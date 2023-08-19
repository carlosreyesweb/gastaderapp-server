import { Prisma, PrismaClient } from '@prisma/client';

export async function seedCategories(client: PrismaClient) {
  const categories: Prisma.CategoryCreateManyInput[] = [
    {
      id: 1,
      name: 'Comida',
    },
    {
      id: 2,
      name: 'Transporte',
    },
    {
      id: 3,
      name: 'Servicios',
    },
    {
      id: 4,
      name: 'Entretenimiento',
    },
    {
      id: 5,
      name: 'Salud',
    },
    {
      id: 6,
      name: 'Educación',
    },
  ];

  console.log('-> Seeding categories...');
  await client.category.createMany({ data: categories });
}
