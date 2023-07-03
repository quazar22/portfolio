FROM node:current-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm install react-scripts -g
RUN npm install serve -g

ENV PORT=3030

COPY . ./
RUN yarn build

ENTRYPOINT [ "serve", "-s", "build" ]
