FROM node:12
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied where available (npm@5+)
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci 
COPY  . .
RUN npm run build 
# Bundle app source
COPY dist ./
EXPOSE 3000
CMD [ "npm", "run", "prod" ]
