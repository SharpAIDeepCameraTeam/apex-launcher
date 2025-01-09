FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Ultraviolet app files
COPY Ultraviolet-App-main ./Ultraviolet-App-main

# Copy scripts and build files
COPY scripts ./scripts

# Build Ultraviolet and other assets
RUN npm run build

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 8000

# Start the application
CMD ["node", "server.js"]
