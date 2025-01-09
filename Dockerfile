FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Ultraviolet files and build scripts
COPY Ultraviolet-main ./Ultraviolet-main
COPY scripts ./scripts

# Build Ultraviolet
RUN npm run build

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 8000

# Start the application
CMD ["node", "server.js"]
