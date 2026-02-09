FROM node:20-alpine
WORKDIR /app

ENV PORT=3000

COPY package.json package-lock.json  ./

RUN npm ci

COPY index.js ./

EXPOSE ${PORT}

CMD [ "node", "index.js" ]
