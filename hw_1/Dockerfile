FROM node:lts-alpine

ENV APP_ID=none

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY index.js log4js.json ./

RUN mkdir /app/logs

EXPOSE 3000

HEALTHCHECK CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

CMD [ "npm" ,"start"]
