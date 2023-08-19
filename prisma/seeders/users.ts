import { Prisma, PrismaClient } from '@prisma/client';

export async function seedUsers(client: PrismaClient) {
  const users: Prisma.UserCreateManyInput[] = [
    {
      id: 1,
      name: 'Carlos Reyes',
      username: 'carlosreyesweb',
      email: 'cgrt17062011@gmail.com',
      passwordHash:
        '$2a$12$F2L616vQ2wNaJD.uciFymegJgqeelZPM3G1blmE7sg4aJ4Xlck9/W',
    },
    {
      id: 2,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@doe.com',
      passwordHash:
        '$2a$12$F2L616vQ2wNaJD.uciFymegJgqeelZPM3G1blmE7sg4aJ4Xlck9/W',
    },
    {
      id: 3,
      name: 'Jane Doe',
      username: 'janedoe',
      email: 'jane@doe.com',
      passwordHash:
        '$2a$12$F2L616vQ2wNaJD.uciFymegJgqeelZPM3G1blmE7sg4aJ4Xlck9/W',
    },
    {
      id: 4,
      name: 'Bob Doe',
      username: 'bobdoe',
      email: 'bob@doe.com',
      passwordHash:
        '$2a$12$F2L616vQ2wNaJD.uciFymegJgqeelZPM3G1blmE7sg4aJ4Xlck9/W',
    },
  ];

  console.log('-> Seeding users...');
  await client.user.createMany({ data: users });
}
