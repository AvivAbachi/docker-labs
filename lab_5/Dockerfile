FROM node:alpine

WORKDIR /app

ENV PORT=3000
ENV DB_HOST=localhost
ENV DB_USER=me
ENV DB_PASSWORD=12345678
ENV DB_NAME=lab_5

COPY . .

RUN npm ci

EXPOSE 3000

CMD [ "npm","start" ]