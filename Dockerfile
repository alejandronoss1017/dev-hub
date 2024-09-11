FROM node:20.17.0-alpine

WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the source files to the container
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

EXPOSE 4000

# Start the server using the production build
CMD ["npm", "run", "start:prod"]
