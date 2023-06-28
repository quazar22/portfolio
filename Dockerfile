FROM node:current-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm install react-scripts -g
RUN npm install serve -g

ENV PORT=

COPY . ./
RUN yarn build

ENTRYPOINT [ "serve", "-s", "build" ]
