FROM node:18-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3003

ENV NODE_ENV=production

CMD ["node", "index.js"]

FROM base AS development

RUN npm install

ENV NODE_ENV=development

CMD ["npm", "run", "start:dev"]