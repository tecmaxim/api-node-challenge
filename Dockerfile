FROM node:12.14.0
WORKDIR /purecloud-derivator
COPY package*.json ./
RUN npm install --only=production
COPY . .
CMD [ "npm", "start" ]
