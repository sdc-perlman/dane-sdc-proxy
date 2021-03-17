FROM node:15-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./babel.config.json ./

RUN npm install

COPY ./public ./public
COPY ./services ./services
COPY ./server ./server

CMD ["npm", "run", "ssr"]