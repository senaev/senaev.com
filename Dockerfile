 # syntax=docker/dockerfile:1
 FROM node:18-alpine
 WORKDIR /
 COPY package.json package-lock.json ./
 RUN npm ci
 COPY . .
 CMD ["node", "src/index.js"]