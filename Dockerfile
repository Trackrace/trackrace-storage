FROM node:16-alpine

WORKDIR /app
COPY . .

EXPOSE 1337

CMD yarn install && yarn build && yarn start