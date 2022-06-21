FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update
RUN apt-get install ffmpeg -y

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . .

EXPOSE 5000
CMD [ "npm", "run", "start" ]
