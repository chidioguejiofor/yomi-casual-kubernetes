FROM node:8.12-alpine
RUN apk add g++ make python
EXPOSE 8080
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

COPY . /app

RUN npm run build

CMD ["npm", "run", "prod"]
