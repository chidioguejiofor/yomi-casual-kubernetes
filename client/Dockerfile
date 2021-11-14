FROM node:12
# RUN apk add g++ make python
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

COPY . /app

RUN npm run build
EXPOSE 8080

CMD ["npm", "run", "prod"]
