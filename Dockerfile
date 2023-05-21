# FROM --platform=linux/amd64 node:alpine
FROM --platform=linux/amd64 node:alpine

# Set the working directory to /app
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package.json .


# This ensures dev dependencies are not run on our docker image creation
RUN npm install 

# Install PM2 globally
RUN npm install -g pm2

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Expose the port that the application listens on
EXPOSE 9000

# Start the application
CMD ["npm","run", "start-pm2"]
