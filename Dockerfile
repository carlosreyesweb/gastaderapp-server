FROM node:20.11.1
WORKDIR /backend
COPY package*.json ./
COPY prisma ./
RUN npm install
RUN npx prisma generate
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]


