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

## How to run locally

To run the project locally, you need to have Docker and Node.js installed on
your machine. After that, you can follow the steps below:

1. Clone the repository
2. Create a `.env` file based on the `.env.example` file and fill the missing
   values.
3. Run `docker compose up -d` to start the database.
4. If it's the first time you're running the project, you need to run the
   migrations and seeders. You can do that by running
   `npm run db:reset`.
5. Run `npm run start:dev` to start the API.
6. Go to `http://localhost:$PORT/docs` to see the Swagger documentation.
7. Congrats! The API is now running and ready to be used.
