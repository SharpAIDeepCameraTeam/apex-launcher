# Multi-stage build for Apex Launcher
FROM node:18-alpine AS base
WORKDIR /app

# Install global dependencies
RUN apk add --no-cache git

# Silicon Launcher Stage
FROM base AS silicon-stage
# Copy entire Silicon Launcher directory
COPY silicon-eaglercraft-launcher-main /app/silicon-launcher
WORKDIR /app/silicon-launcher
RUN npm install || true

# Ultraviolet Proxy Stage
FROM base AS ultraviolet-stage
COPY Ultraviolet-App-main /app/ultraviolet
WORKDIR /app/ultraviolet
RUN npm install || true
RUN npm run build || true

# Final Stage
FROM base AS final
# Copy all files to serve
COPY --from=silicon-stage /app/silicon-launcher /app/silicon-eaglercraft-launcher-main
COPY --from=ultraviolet-stage /app/ultraviolet /app/Ultraviolet-App-main
COPY index.html /app/index.html

# Set up Ultraviolet
WORKDIR /app/Ultraviolet-App-main
RUN npm install || true
RUN npm run build || true

# Return to app directory
WORKDIR /app

# Install a simple static file server
RUN npm install -g serve

# Expose port
EXPOSE 8000

# Command to run both applications
CMD ["sh", "-c", "cd /app && serve -s . -l 8000"]
