FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Ultraviolet files
COPY Ultraviolet-main/src/uv.* ./uv/
COPY Ultraviolet-main/src/client ./uv/client
COPY Ultraviolet-main/src/rewrite ./uv/rewrite

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 8000

# Start the application
CMD ["node", "server.js"]
