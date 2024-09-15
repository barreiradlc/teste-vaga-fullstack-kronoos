# Use the official Node.js image.
FROM node:18

# Set the working directory.
WORKDIR /app

# Copy the package.json and install dependencies.
COPY package*.json ./
RUN npm install

# Copy the rest of the application code.
COPY . .

# Expose port 3333 (or the port your app uses).
EXPOSE 3333

# RUN apt-get update -y && apt-get install -y openssl build-essential libpq-dev


# Command to start the app.
CMD ["npm", "start"]
