# Use Node.js as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy Ultraviolet files
COPY Ultraviolet-App-main/. .

# Install dependencies and build
RUN npm install
RUN npm run build

# Expose port
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
