
ARG NODE_VERSION=18.20.3
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app

FROM base AS development

COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start:dev"]


FROM base AS production
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build
CMD ["node", "dist/main.js"]