FROM node:21.6.2

WORKDIR /backend

COPY package*.json ./
COPY prisma ./
RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 3000
CMD ["npm", "run", "start:dev"]


