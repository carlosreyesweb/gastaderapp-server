FROM node:20.11.1-alpine as base
RUN apk add --no-cache libc6-compat

# Dev stage
FROM base as dev
WORKDIR /api
ENV NODE_ENV=development
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
CMD ["npm", "run", "start:dev"]

# Build stage
FROM base AS build
WORKDIR /api
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node prisma ./prisma
COPY --chown=node:node .env ./
RUN npx prisma generate
COPY --chown=node:node src ./src
COPY --chown=node:node tsconfig*.json ./
RUN npm run build

# Prod stage
FROM base AS prod
WORKDIR /api
COPY --from=build --chown=node:node /api/node_modules ./node_modules
COPY --from=build --chown=node:node /api/prisma/migrations ./prisma/migrations
COPY --from=build --chown=node:node /api/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=build --chown=node:node /api/dist/src ./src
COPY --from=build --chown=node:node /api/package*.json ./
COPY --from=build --chown=node:node /api/.env ./
ENV NODE_ENV=production
RUN npm prune
USER node
CMD ["node", "src/main.js"]
