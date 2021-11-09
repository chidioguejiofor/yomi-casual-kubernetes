FROM node:8.12-alpine
RUN apk add g++ make python
EXPOSE 8080
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install
CMD ["npm", "run", "prod"]
