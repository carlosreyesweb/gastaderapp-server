# Base stage
FROM node:20.11.1 AS base
WORKDIR /api
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate

# dev stage
FROM base AS dev
CMD ["npm", "run", "start:dev"]

# prod stage
FROM base AS prod
LABEL maintainer="Carlos Reyes Web <contact@carlosreyesweb.com>"
LABEL version="1.0"
LABEL description="An API for a theoretical personal finance management app."
LABEL repository="https://github.com/carlosreyesweb/gastaderapp-server"
RUN npm run build
CMD ["npm", "run", "start:prod"]