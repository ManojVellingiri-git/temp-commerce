# Multi-stage production build for React frontend
# Stage 1: Build assets
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies using package-lock
COPY package.json package-lock.json ./
RUN npm ci

# Pass API URL at build time if needed (defaults to relative /api for reverse proxy)
ARG REACT_APP_API_URL=/api
ARG REACT_APP_RAZORPAY_KEY_ID=
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_RAZORPAY_KEY_ID=$REACT_APP_RAZORPAY_KEY_ID

# Copy application source
COPY public ./public
COPY src ./src

# Build optimized production bundle
RUN npm run build

# Stage 2: Production Nginx web server
FROM nginx:1.27-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy hardened Nginx configuration
COPY nginx/frontend.conf /etc/nginx/conf.d/default.conf

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:80/healthz || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
