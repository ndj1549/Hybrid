FROM node:10.23.3-alpine3.10

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENV PORT 81
ENV BaseAddress "localhost"
ENV BasePORT 5000
ENV CallRate_4_Products '05 04 02 * * *'
ENV CallRate_4_Centers '35 24 02 * * *'
ENV CallRate_4_Customers '10 27 02 * * *'
ENV CallRate_4_CustomersMandeEtebar '30 40 02 * * *'
ENV CallRate_4_ClearTokens '0 0 */2 * * *'
# ENV TZ 'Europe/Amsterdam'
ENV TZ 'Asia/Tehran'



EXPOSE $PORT

CMD ["node", "scheduler/index.js"]