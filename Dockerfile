# Use the official Node.js image.
FROM node:18

# Set the working directory.
WORKDIR /app
VOLUME /usr/src/app

# Copy the package.json and install dependencies.
COPY package*.json ./
RUN npm install

# Install `tsx` globally to enable watch mode
RUN npm install -g tsx

# Copy the rest of the application code.
COPY . .

# Expose port 3333 (or the port your app uses).
EXPOSE 3333

# RUN apt-get update -y && apt-get install -y openssl build-essential libpq-dev

# Command to start the app.
CMD ["tsx", "watch", "src/server.ts"]
