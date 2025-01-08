# Multi-stage build for Apex Launcher
FROM node:18-alpine AS base
WORKDIR /app

# Install global dependencies
RUN apk add --no-cache git

# Silicon Launcher Stage
FROM base AS silicon-stage
COPY "Silicon Launcher" /app/silicon-launcher
WORKDIR /app/silicon-launcher
RUN npm install || true

# Ultraviolet Proxy Stage
FROM base AS ultraviolet-stage
COPY Ultraviolet-App-main /app/ultraviolet
WORKDIR /app/ultraviolet
RUN npm install || true

# Final Stage
FROM base AS final
COPY --from=silicon-stage /app/silicon-launcher /app/silicon-launcher
COPY --from=ultraviolet-stage /app/ultraviolet /app/ultraviolet
COPY index.html /app/index.html
COPY koyeb.yaml /app/koyeb.yaml

# Install a simple static file server
RUN npm install -g serve

# Expose port
EXPOSE 8000

# Command to run both applications
CMD ["sh", "-c", "serve -s . -l 8000"]
