# Use the official Node.js 20 image
FROM node:20-slim

# Set the working directory in the container
WORKDIR /app

# Tell npm to ignore peer-dependency conflicts, which can be common in dev
RUN npm config set legacy-peer-deps true

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
# Using 'npm install' is more appropriate for dev than 'npm ci'
RUN npm install

# The source code will be mounted via the volume in docker-compose.yml,
# so we don't need to copy it into the image. This is key for live-reloading.

# Expose the port the app runs on
EXPOSE 3000

# The command to run the app will be provided by docker-compose.yml
# This CMD is a fallback if you run the container without docker-compose.
CMD ["npm", "run", "dev"]
