/**
 * FreshCart Staging Automated Smoke Test Script
 * Tests:
 * 1. Gateway HTTPS termination & security headers
 * 2. HTTP to HTTPS 301 redirection
 * 3. Health & Database connectivity (/health & /api/health)
 * 4. Product & Category browsing
 * 5. Customer registration, login, and profile
 * 6. Admin login & RBAC route authorization
 * 7. Cart & order validation
 * 8. Host MongoDB port isolation
 */

const https = require('https');
const http = require('http');
const net = require('net');

// Accept self-signed staging certificate for testing
const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

const BASE_HTTPS = 'https://127.0.0.1';
const BASE_HTTP = 'http://127.0.0.1';

// Helper function for HTTP/HTTPS requests
const makeRequest = (urlStr, options = {}) => {
    return new Promise((resolve, reject) => {
        const url = new URL(urlStr);
        const isHttps = url.protocol === 'https:';
        const client = isHttps ? https : http;

        const reqOptions = {
            hostname: url.hostname,
            port: url.port || (isHttps ? 443 : 80),
            path: url.pathname + url.search,
            method: options.method || 'GET',
            headers: options.headers || {},
            agent: isHttps ? httpsAgent : undefined
        };

        const req = client.request(reqOptions, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                let json;
                try {
                    json = JSON.parse(data);
                } catch {
                    json = data;
                }
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    body: json
                });
            });
        });

        req.on('error', reject);

        if (options.body) {
            req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
        }
        req.end();
    });
};

// Check if a TCP port is open on localhost
const checkPort = (port) => {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(1000);
        socket.on('connect', () => {
            socket.destroy();
            resolve(true); // Open
        });
        socket.on('timeout', () => {
            socket.destroy();
            resolve(false); // Closed
        });
        socket.on('error', () => {
            resolve(false); // Closed
        });
        socket.connect(port, '127.0.0.1');
    });
};

async function runSmokeTests() {
    console.log('====================================================');
    console.log('FreshCart Staging End-to-End Automated Smoke Tests');
    console.log('====================================================\n');

    const results = [];

    const record = (name, status, details) => {
        results.push({ name, status, details });
        const icon = status === 'PASS' ? '✅ PASS' : '❌ FAIL';
        console.log(`${icon} - ${name}`);
        if (details) console.log(`   Details: ${details}\n`);
    };

    try {
        // 1. Gateway HTTP to HTTPS redirect
        const redirectRes = await makeRequest(`${BASE_HTTP}/`);
        if (redirectRes.status === 301 && redirectRes.headers.location && redirectRes.headers.location.startsWith('https://')) {
            record('1. HTTP-to-HTTPS Redirection', 'PASS', `Status: 301, Location: ${redirectRes.headers.location}`);
        } else {
            record('1. HTTP-to-HTTPS Redirection', 'FAIL', `Expected 301 redirect, got status: ${redirectRes.status}`);
        }

        // 2. HTTPS Frontend Delivery & Security Headers
        const frontRes = await makeRequest(`${BASE_HTTPS}/`);
        const hasHsts = !!frontRes.headers['strict-transport-security'];
        const hasXfo = !!frontRes.headers['x-frame-options'];
        const isHtml = typeof frontRes.body === 'string' && frontRes.body.includes('<div id="root">');
        if (frontRes.status === 200 && isHtml && hasHsts && hasXfo) {
            record('2. HTTPS Frontend Delivery & Security Headers', 'PASS', `Status: 200, HSTS: ${hasHsts}, X-Frame-Options: ${frontRes.headers['x-frame-options']}`);
        } else {
            record('2. HTTPS Frontend Delivery & Security Headers', 'FAIL', `Status: ${frontRes.status}, isHtml: ${isHtml}`);
        }

        // 3. Health check endpoints
        const healthRes = await makeRequest(`${BASE_HTTPS}/health`);
        const apiHealthRes = await makeRequest(`${BASE_HTTPS}/api/health`);
        if (healthRes.status === 200 && healthRes.body.status === 'ok' && healthRes.body.database?.status === 'connected' && apiHealthRes.status === 200) {
            record('3. Backend Health & DB Readiness (/health & /api/health)', 'PASS', `Status: 200, DB: ${healthRes.body.database.status}, Uptime: ${healthRes.body.uptime}s`);
        } else {
            record('3. Backend Health & DB Readiness (/health & /api/health)', 'FAIL', `Status: ${healthRes.status}, Body: ${JSON.stringify(healthRes.body)}`);
        }

        // 4. Product and Category Browsing
        const prodRes = await makeRequest(`${BASE_HTTPS}/api/products`);
        const catRes = await makeRequest(`${BASE_HTTPS}/api/categories`);
        if (prodRes.status === 200 && prodRes.body.data?.products?.length > 0 && catRes.status === 200 && catRes.body.data?.length > 0) {
            record('4. Catalog Browsing (/api/products & /api/categories)', 'PASS', `Products loaded: ${prodRes.body.data.products.length}, Categories loaded: ${catRes.body.data.length}`);
        } else {
            record('4. Catalog Browsing (/api/products & /api/categories)', 'FAIL', `Products status: ${prodRes.status}, Categories status: ${catRes.status}`);
        }

        // 5. User Registration and Login
        const uniqueEmail = `test_${Date.now()}@staging.freshcart.com`;
        const regRes = await makeRequest(`${BASE_HTTPS}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {
                name: 'Automated Test User',
                email: uniqueEmail,
                phone: '9876543210',
                password: 'CustomerPassword2026!'
            }
        });

        let customerToken;
        if (regRes.status === 201 && regRes.body.data?.token) {
            customerToken = regRes.body.data.token;
            record('5. Customer Registration', 'PASS', `Registered user: ${uniqueEmail}, Token received`);
        } else {
            record('5. Customer Registration', 'FAIL', `Status: ${regRes.status}, Message: ${JSON.stringify(regRes.body)}`);
        }

        // Customer Login
        const loginRes = await makeRequest(`${BASE_HTTPS}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {
                email: uniqueEmail,
                password: 'CustomerPassword2026!'
            }
        });

        if (loginRes.status === 200 && loginRes.body.data?.token) {
            customerToken = loginRes.body.data.token;
            record('6. Customer Authentication (/api/auth/login)', 'PASS', `Login verified for ${uniqueEmail}`);
        } else {
            record('6. Customer Authentication (/api/auth/login)', 'FAIL', `Status: ${loginRes.status}`);
        }

        // Customer Profile (/api/auth/me)
        const meRes = await makeRequest(`${BASE_HTTPS}/api/auth/me`, {
            headers: { Authorization: `Bearer ${customerToken}` }
        });
        if (meRes.status === 200 && meRes.body.data?.role === 'customer') {
            record('7. Customer Profile Verification (/api/auth/me)', 'PASS', `Role: ${meRes.body.data.role}, Name: ${meRes.body.data.name}`);
        } else {
            record('7. Customer Profile Verification (/api/auth/me)', 'FAIL', `Status: ${meRes.status}`);
        }

        // 8. Admin Login and Authorization (RBAC)
        const adminLoginRes = await makeRequest(`${BASE_HTTPS}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {
                email: 'admin@staging.freshcart.com',
                password: 'StagingAdminSecure2026!'
            }
        });

        let adminToken;
        if (adminLoginRes.status === 200 && adminLoginRes.body.data?.role === 'admin') {
            adminToken = adminLoginRes.body.data.token;
            record('8. Admin Authentication', 'PASS', `Admin verified: admin@staging.freshcart.com, Role: ${adminLoginRes.body.data.role}`);
        } else {
            record('8. Admin Authentication', 'FAIL', `Status: ${adminLoginRes.status}, Body: ${JSON.stringify(adminLoginRes.body)}`);
        }

        // RBAC: Customer accessing admin-only endpoint should be 403 Forbidden
        const rbacDenyRes = await makeRequest(`${BASE_HTTPS}/api/orders`, {
            headers: { Authorization: `Bearer ${customerToken}` }
        });
        // Admin accessing admin orders should be 200 OK
        const rbacAllowRes = await makeRequest(`${BASE_HTTPS}/api/orders`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });

        if (rbacDenyRes.status === 403 && rbacAllowRes.status === 200) {
            record('9. Admin RBAC Authorization Guard', 'PASS', `Customer blocked (403 Forbidden), Admin permitted (200 OK)`);
        } else {
            record('9. Admin RBAC Authorization Guard', 'FAIL', `Customer status: ${rbacDenyRes.status} (expected 403), Admin status: ${rbacAllowRes.status} (expected 200)`);
        }

        // 10. Cart Behavior & Order Validation
        const sampleProduct = prodRes.body.data.products[0];
        const invalidOrderRes = await makeRequest(`${BASE_HTTPS}/api/payments/create-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${customerToken}`
            },
            body: {
                items: [], // Invalid: empty
                address: {}
            }
        });

        if (invalidOrderRes.status === 400) {
            record('10. Cart & Order Validation Guard', 'PASS', `Empty items correctly rejected with 400 Bad Request`);
        } else {
            record('10. Cart & Order Validation Guard', 'FAIL', `Expected 400, got ${invalidOrderRes.status}`);
        }

        // 11. MongoDB Host Port Isolation Check
        const isMongoHostOpen = await checkPort(27017);
        if (!isMongoHostOpen) {
            record('11. Database Port Host Isolation', 'PASS', `Host port 27017 is closed. MongoDB is strictly isolated on internal container network.`);
        } else {
            record('11. Database Port Host Isolation', 'FAIL', `SECURITY ALERT: Port 27017 is open on host!`);
        }

    } catch (err) {
        console.error('Smoke test runtime exception:', err);
    }

    console.log('====================================================');
    const passed = results.filter(r => r.status === 'PASS').length;
    const total = results.length;
    console.log(`Summary: ${passed}/${total} smoke tests passed.`);
    console.log('====================================================');
}

runSmokeTests();
