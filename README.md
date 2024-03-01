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

The easiest way to run this project is by using Docker. If you don't have it
installed, you can follow the instructions on the [official website](https://www.docker.com/get-started).

1. Clone the repository
2. Create a `.env` file based on the `.env.example` file and fill it with your
   own values.
3. Run `docker compose up -d` to start both the database and the backend.
4. Run `docker compose exec backend npm run db:init` to init the
   database.
5. Go to `http://localhost:3000/docs` to see the Swagger documentation.
6. Congrats! The API is now running and ready to be used.
