FROM node:15-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY ./server ./server

CMD ["npm", "run", "dev"]