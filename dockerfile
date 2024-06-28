FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN npm run up

EXPOSE 80

CMD [ "npm", "start" ]