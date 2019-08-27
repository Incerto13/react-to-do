FROM node:lts-slim
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app
RUN npm install
COPY . .
# container port: match port exposed in mock api on frontend for consistentcy 
EXPOSE 3001
CMD [ "npm", "start"  ]