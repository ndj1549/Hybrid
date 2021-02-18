FROM node:10.23.3-alpine3.10

WORKDIR /app

#Download oracle client binary for linux.
RUN wget https://download.oracle.com/otn_software/linux/instantclient/195000/instantclient-basic-linux.x64-19.5.0.0.0dbru.zip

#If you need to build frequently, it may be more useful to copy a pre-downloaded one.
#COPY ./instantclient-basic-linux.x64-19.5.0.0.0dbru.zip /app

#Install on /opt/oracle/instantclient_19_5
RUN unzip instantclient-basic-linux.x64-19.5.0.0.0dbru.zip
RUN mkdir -p /opt/oracle
RUN mv instantclient_19_5 /opt/oracle

#Add library path of oracle binrary to LD_LIBRARY_PATH
ENV LD_LIBRARY_PATH /opt/oracle/instantclient_19_5:$LD_LIBRARY_PATH
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


#Copy NodeJs related files and install dependencies.
# ADD ./app /app/app
COPY . /app
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install

#Install additional libraries that are required to run oracle binaries.
# RUN apt update
# RUN apt install libaio-dev -y

CMD ["node","app/app.js"]