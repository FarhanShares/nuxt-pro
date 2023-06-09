FROM node:16.17.0-alpine as build
RUN apk update && apk upgrade

WORKDIR /var/app/build
COPY . .
RUN yarn install
RUN yarn build


FROM node:16.17.0-alpine as main

WORKDIR /var/app/main
COPY --from=0 /var/app/build/.output ./

EXPOSE 3000
CMD ["node", "server/index.mjs"]