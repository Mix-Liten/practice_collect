FROM node:16.14.2-alpine3.14

RUN apk update

WORKDIR /workspace

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD npm run server
