import { Prisma, PrismaClient, Role } from '@prisma/client';

export async function seedUsers(client: PrismaClient) {
  const users: Prisma.UserCreateManyInput[] = [
    {
      name: 'Carlos Reyes',
      email: 'cgrt17062011@gmail.com',
      passwordHash:
        '$2a$12$F2L616vQ2wNaJD.uciFymegJgqeelZPM3G1blmE7sg4aJ4Xlck9/W',
      role: Role.ADMIN,
    },
    {
      name: 'Neidymar Vargas',
      email: 'alejandravargasuarez@gmail.com',
      passwordHash:
        '$2a$12$F2L616vQ2wNaJD.uciFymegJgqeelZPM3G1blmE7sg4aJ4Xlck9/W',
    },
  ];

  console.log('-> Seeding users...');
  await client.user.createMany({ data: users });
}
