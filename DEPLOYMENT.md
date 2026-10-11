# FreshCart Grocery E-Commerce — Staging Deployment Guide

## 1. Overview & Architecture

This guide details the deployment of the FreshCart grocery e-commerce application to a private staging environment using Docker Compose and Nginx reverse proxy with HTTPS termination.

### Architecture Diagram

```
                      Internet / Staging Client
                                 │
                  ┌──────────────┴──────────────┐
                  │ HTTP :80 (Redirect to 443)  │
                  │ HTTPS :443 (TLS Terminated) │
                  └──────────────┬──────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │     freshcart-gateway   │
                    │   (Nginx Reverse Proxy) │
                    └──────┬────────────┬─────┘
           Path: /         │            │ Path: /api/ & /health
    ┌──────────────────────▼───────┐  ┌─▼──────────────────────────┐
    │     freshcart-frontend       │  │      freshcart-backend     │
    │   (React SPA on Nginx:80)    │  │   (Node.js / Express:5001) │
    └──────────────────────────────┘  └─────────────┬──────────────┘
              [frontend-net]                        │ Internal
                                                    │ MONGODB_URI
                                      ┌─────────────▼──────────────┐
                                      │      freshcart-mongodb     │
                                      │     (MongoDB 7.0 - Auth)   │
                                      │   [backend-net: internal]  │
                                      └────────────────────────────┘
```

### Key Security & Operational Guarantees
- **Private Database**: MongoDB runs exclusively on the internal `backend-net` bridge network. Port 27017 is **never exposed** to the host or public internet.
- **Strict Authentication**: MongoDB requires root or application credentials (`MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD`).
- **HTTPS Termination**: TLSv1.2 & TLSv1.3 termination at the Nginx Gateway with HSTS, X-Frame-Options, X-Content-Type-Options, and automatic HTTP-to-HTTPS 301 redirection.
- **Strict CORS**: Dynamic origin validation using the `CLIENT_URL` environment variable; cross-origin requests from unauthorized origins are rejected.
- **Safe Logging**: The Express server implements non-sensitive structured logging without dumping sensitive headers (Authorization) or request bodies.
- **Graceful Shutdown**: The backend intercepts `SIGTERM` and `SIGINT`, drains existing connections, closes MongoDB connections gracefully, and terminates with a 10s watchdog.
- **Health Probing**: Deep health check at `/api/health` and `/health` reporting server uptime, environment, and MongoDB readyState (status `ok` or `degraded`).

---

## 2. Prerequisites

| Component | Minimum Version | Verification Command |
| :--- | :--- | :--- |
| **Docker Engine** | 24.0.0+ | `docker --version` |
| **Docker Compose** | v2.20.0+ | `docker compose version` |
| **OpenSSL** | 1.1.1+ (or Git Bash OpenSSL) | `openssl version` |
| **Node.js** (Optional for host scripts) | 18.0.0+ | `node --version` |

### Staging Local Domain (Optional for Local DNS)
Add the staging hostname to your hosts file (`/etc/hosts` on Linux/macOS, or `C:\Windows\System32\drivers\etc\hosts` on Windows):
```text
127.0.0.1 staging.grocery.local
```

---

## 3. Environment Configuration

### Step 3.1: Initialize Staging Secrets
Copy the staging environment template to create the `.env` file:

```bash
# On Linux / macOS
cp .env.staging.example .env

# On Windows PowerShell
Copy-Item .env.staging.example .env
```

> [!IMPORTANT]
> The `.env` file and any files matching `.env.*` are strictly excluded from source control via `.gitignore`. Never commit `.env` to Git.

### Step 3.2: Environment Variable Reference

| Variable | Description | Example / Recommended Staging Value |
| :--- | :--- | :--- |
| `NODE_ENV` | Runtime environment identifier | `staging` |
| `PORT` | Backend internal port | `5001` |
| `CLIENT_URL` | Allowed client origins (comma-separated for multi-domain) | `https://staging.grocery.local,http://localhost:3000` |
| `REACT_APP_API_URL` | Frontend API path (use `/api` to route via reverse proxy) | `/api` |
| `MONGO_INITDB_ROOT_USERNAME` | Root database administrator username | `staging_admin` |
| `MONGO_INITDB_ROOT_PASSWORD` | Strong password for MongoDB root user | *Generate with `openssl rand -hex 16`* |
| `MONGODB_URI` | Full authenticated connection string for backend | `mongodb://staging_admin:<PASSWORD>@mongodb:27017/grocery_db?authSource=admin` |
| `JWT_SECRET` | Secret key used for signing authentication JWT tokens | *Generate with `openssl rand -hex 32`* |
| `RAZORPAY_KEY_ID` | Razorpay Test Mode Key ID | `rzp_test_...` (Provided by account owner) |
| `RAZORPAY_KEY_SECRET` | Razorpay Test Mode Key Secret | *Secret provided by account owner* |

---

## 4. SSL/TLS Certificate Setup

The Nginx Gateway requires SSL certificates at `nginx/certs/cert.pem` and `nginx/certs/key.pem`.

### Generating Self-Signed Staging Certificates

**On Linux / macOS:**
```bash
bash scripts/generate-staging-certs.sh
```

**On Windows PowerShell:**
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\generate-staging-certs.ps1
```

### Production / Formal Staging Certificates
If deploying to a domain with Let's Encrypt or an organizational CA:
1. Place the full certificate chain in `nginx/certs/cert.pem`.
2. Place the private key in `nginx/certs/key.pem`.
3. Set file permissions: `chmod 600 nginx/certs/key.pem` and `chmod 644 nginx/certs/cert.pem`.

---

## 5. Starting the Staging Stack

### Step 5.1: Build and Launch Containers
```bash
docker compose -f docker-compose.staging.yml up -d --build
```

### Step 5.2: Inspect Container Status and Health
```bash
docker compose -f docker-compose.staging.yml ps
```
Expected output:
```text
NAME                         IMAGE               COMMAND                  SERVICE    STATUS
freshcart-staging-backend    ...                 "node src/server.js"     backend    Up (healthy)
freshcart-staging-frontend   ...                 "nginx -g 'daemon..."    frontend   Up (healthy)
freshcart-staging-gateway    nginx:1.27-alpine   "/docker-entrypoint…"    gateway    Up (healthy)
freshcart-staging-mongodb    mongo:7.0           "docker-entrypoint.s…"   mongodb    Up (healthy)
```

---

## 6. Database Migrations & Initial Seeding

Run the following commands inside the running backend container to populate initial products, categories, coupons, and administrative credentials:

### 6.1: Seed Product Catalog and Categories
```bash
docker compose -f docker-compose.staging.yml exec backend npm run data:import
```

### 6.2: Create System Administrator
```bash
docker compose -f docker-compose.staging.yml exec backend node createAdmin.js admin@staging.freshcart.com StagingAdminPass2026!
```

### 6.3: Seed Test Coupons
```bash
docker compose -f docker-compose.staging.yml exec backend node seed_coupon.js
```

### 6.4: Reset Database (If Clean State is Needed)
```bash
docker compose -f docker-compose.staging.yml exec backend npm run data:destroy
```

---

## 7. Verification & Smoke Testing

### Test 1: Gateway HTTP-to-HTTPS Redirection
Verify that plain HTTP requests on port 80 are redirected to HTTPS on port 443:
```bash
curl -I http://localhost/
# Expected: HTTP/1.1 301 Moved Permanently, Location: https://localhost/
```

### Test 2: Gateway Liveness Probe
```bash
curl http://localhost/health-proxy
# Expected: proxy alive
```

### Test 3: Backend Health & Database Connectivity
```bash
curl -k https://localhost/health
```
Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-10-11T14:50:00.000Z",
  "uptime": 45,
  "environment": "staging",
  "database": {
    "status": "connected",
    "readyState": 1
  }
}
```

### Test 4: Frontend HTML Delivery
```bash
curl -k https://localhost/
# Expected: HTTP/2 200 with HTML title <title>Online Grocery Shopping and Delivery | FreshCart</title>
```

### Test 5: API End-to-End Connectivity
```bash
curl -k https://localhost/api/products
# Expected: JSON response with active catalog products
```

### Test 6: Razorpay Test Mode Verification
1. Access `https://staging.grocery.local` in browser (accept self-signed certificate warning for staging).
2. Log in as a customer or register a test account.
3. Add a product to cart and navigate to checkout.
4. Click **Place Order & Pay**.
5. Verify the Razorpay Modal opens in **Test Mode** (showing Razorpay Test Mode banner).
6. Complete payment using standard Razorpay Test Mode test cards (e.g., `4111 1111 1111 1111`, any future date, OTP `123456`).
7. Verify successful redirection to `/order-success/:id` and order status `Confirmed` in database.

---

## 8. Logs & Observability

### View Unified Live Logs
```bash
docker compose -f docker-compose.staging.yml logs -f
```

### View Backend Logs
```bash
docker compose -f docker-compose.staging.yml logs -f backend
```

### View Gateway Access and Error Logs
```bash
docker compose -f docker-compose.staging.yml logs -f gateway
```

### View MongoDB Logs
```bash
docker compose -f docker-compose.staging.yml logs -f mongodb
```

---

## 9. Rollback & Maintenance Procedures

### Graceful Staging Stop
```bash
docker compose -f docker-compose.staging.yml down
```

### Full Reset (Preserving Persistent Volume Data)
```bash
docker compose -f docker-compose.staging.yml down
docker compose -f docker-compose.staging.yml up -d
```

### Rollback to Previous Deployment
If a newly deployed image introduces an issue:
1. Re-tag or check out the last known stable Git commit:
   ```bash
   git checkout <last-stable-commit>
   ```
2. Re-build and restart the containers:
   ```bash
   docker compose -f docker-compose.staging.yml up -d --build
   ```

### Database Backup & Restore
To backup the staging database:
```bash
docker compose -f docker-compose.staging.yml exec mongodb mongodump \
  -u staging_admin -p <PASSWORD> --authenticationDatabase admin \
  --db grocery_db --out /data/db/backup_$(date +%F)
```

To restore from a backup:
```bash
docker compose -f docker-compose.staging.yml exec mongodb mongorestore \
  -u staging_admin -p <PASSWORD> --authenticationDatabase admin \
  --nsInclude="grocery_db.*" /data/db/backup_<DATE>/grocery_db
```

---

## 10. Secrets Rotation Procedures

If any credentials (such as JWT secret or Razorpay keys) are suspected of being compromised:

1. **Razorpay Key Rotation**:
   - Log into the [Razorpay Dashboard](https://dashboard.razorpay.com).
   - Navigate to **Settings > API Keys**.
   - Generate a new Test Key.
   - Update `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `.env`.
   - Revoke the old key after confirming operation.
   - Restart the backend: `docker compose -f docker-compose.staging.yml restart backend`.

2. **JWT Secret Rotation**:
   - Generate a new random secret: `openssl rand -hex 32`.
   - Update `JWT_SECRET` in `.env`.
   - Restart backend: `docker compose -f docker-compose.staging.yml restart backend`.
   - *Note: Existing sessions will expire and require user re-authentication.*

3. **Database Credentials Rotation**:
   - Connect to MongoDB: `docker compose -f docker-compose.staging.yml exec mongodb mongosh -u staging_admin -p <OLD_PASSWORD> --authenticationDatabase admin`
   - Update user password: `db.changeUserPassword("staging_admin", "<NEW_PASSWORD>")`
   - Update `MONGO_INITDB_ROOT_PASSWORD` and `MONGODB_URI` in `.env`.
   - Restart backend: `docker compose -f docker-compose.staging.yml restart backend`.
