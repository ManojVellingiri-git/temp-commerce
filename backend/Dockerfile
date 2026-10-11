# Production Dockerfile for Backend Node.js API
FROM node:20-alpine

# Security: Install updates and wget for healthchecks
RUN apk update && apk upgrade && apk add --no-cache wget

WORKDIR /app

# Set production/staging environment defaults
ENV NODE_ENV=staging \
    PORT=5001

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy application source code
COPY src ./src
COPY seeder.js createAdmin.js seed_coupon.js ./

# Assign ownership to unprivileged user
RUN chown -R node:node /app

# Run as non-root user
USER node

# Health check against dedicated endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:5001/api/health || exit 1

EXPOSE 5001

CMD ["node", "src/server.js"]
