FROM node:15.5-alpine

RUN [ "mkdir", "/app" ]
WORKDIR /app

# install dependencies
RUN [ "apk", "add", "curl"]
RUN curl -f https://get.pnpm.io/v6.7.js | node - add --global pnpm
RUN [ "apk", "del", "curl"]
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN [ "pnpm", "install" ]

# install codebase
COPY . .

ENTRYPOINT [ "node", "./src/index.js" ]
