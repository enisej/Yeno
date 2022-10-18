FROM node:16
ENV NODE_ENV production
RUN mkdir -p /usr/src/client
WORKDIR /usr/src/client

# Install app dependencies
COPY package.json /usr/src/client/
RUN npm install

# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci
# Build the app
#RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD [ "npm", "start"]