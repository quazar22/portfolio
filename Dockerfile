FROM node:current-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY .env ./.env

RUN npm install --legacy-peer-deps
RUN npm install react-scripts -g
RUN npm install serve -g

ENV PORT=3030

COPY . ./
RUN yarn build

ENTRYPOINT [ "serve", "-s", "build" ]
