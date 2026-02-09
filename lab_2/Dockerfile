FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json  ./

RUN npm ci

COPY index.js .enb ./

EXPOSE 3000

CMD [ "node", "index.js" ]
