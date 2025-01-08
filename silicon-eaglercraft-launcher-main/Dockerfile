FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app files
COPY . .

# Expose port
EXPOSE 8081

# Set host to 0.0.0.0 to allow external connections
ENV HOST=0.0.0.0

# Start the application
CMD ["npm", "start"]
