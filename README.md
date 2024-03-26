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

# How to run inside a Dev Container

1. Install the Remote - Containers extension on VSCode
2. Open the project in VSCode
3. Click on the green button on the bottom left corner of the screen
4. Select "Reopen in Container"
5. Wait for the container to be built
6. Run `npm run start:dev` to start the API
7. Go to `http://localhost:4000/docs` to see the Swagger documentation
8. Congrats! The API is now running and ready to develop on it.

## How to run locally

To run the project locally, you need to have Node.js and an instance of MySQL/MariaDB
installed on your machine. After that, you can follow the steps below:

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Create a `.env` file in the root of the project based on the `.env.example` file
4. Run `npm run db:reset` to create the database and run the migrations
5. Run `npm run start:dev` to start the API
6. Go to `http://localhost:4000/docs` to see the Swagger documentation
7. Congrats! The API is now running and ready to develop on it.
