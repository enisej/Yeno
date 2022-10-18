FROM node:16
ENV NODE_ENV production
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080
CMD [ "node", "index.js" ]