FROM node:10.23.3-alpine3.10

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENV PORT 80
ENV NODE_ENV "dev"

EXPOSE $PORT

CMD ["node", "index.js"]