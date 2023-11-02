# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY ./src .

# Expose the port that the application will run on
EXPOSE 3000

# Start the Node.js application
CMD ["node", "app.js" ]

# CMD ["npx", "mocha", "test.js" ]