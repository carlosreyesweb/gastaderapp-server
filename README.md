# Gastaderapp

An API for a theoretical personal finance management app.

I said theoretical because I'm not sure if I will ever finish it, but I think
it's a good idea to have a public backend project to work on, learn and share
my little but humble knowledge in the field.

## Features

- [x] User authentication
- [x] User registration
- [x] Account creation
- [x] Account management
- [x] Transaction creation
- [x] Transaction management
- [x] Transaction categorization
- [x] Transaction filtering
- [x] Balance calculation
- [x] ... and more to come (I hope)

## Technologies

- [x] NestJS
- [x] Prisma
- [x] Swagger

## How to run

1. Clone the repository
2. Install the dependencies
3. Create a `.env` file based on the `.env.example` file
4. Run the app

```bash
git clone
cd gastaderapp-server
npm install
cp .env.example .env
npm run start:dev
```

This backend uses MySQL as database, but you can change it to any other database
supported by Prisma by changing the `DATABASE_ENGINE` environment variable in
the `.env` file.
