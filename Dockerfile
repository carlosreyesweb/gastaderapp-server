FROM node:20.11.1-alpine as base
RUN apk add --no-cache libc6-compat

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
ENV NODE_ENV=production
RUN npm prune && npm cache clean --force

# Prod stage
FROM base AS prod
WORKDIR /api
COPY --from=build --chown=node:node /api/node_modules ./node_modules
COPY --from=build --chown=node:node /api/prisma/migrations ./prisma/migrations
COPY --from=build --chown=node:node /api/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=build --chown=node:node /api/dist/src ./src
COPY --from=build --chown=node:node /api/package*.json ./
COPY --from=build --chown=node:node /api/.env ./
USER node
CMD ["node", "src/main.js"]
