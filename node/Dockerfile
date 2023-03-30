FROM node:latest

WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./node .

#VOLUME ./working /usr/src/app/working

#
EXPOSE 8080
#
#CMD [ "/app/node_modules/nodemon/bin/nodemon.js", "index.js" ]
CMD [ "node", "index.js" ]
