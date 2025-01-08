# Use Node.js as base
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY Ultraviolet-App-main/package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY Ultraviolet-App-main/src ./src
COPY Ultraviolet-App-main/public ./public

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy built files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Install production dependencies only
RUN npm install --production

# Expose port
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
