# FROM --platform=linux/amd64 node:alpine
FROM --platform=linux/amd64 node:alpine

WORKDIR /app
COPY package.json .

# This ensures dev dependencies are not run on our docker image creation
RUN npm install 
COPY . .
EXPOSE 9000
CMD ["npm", "start"]