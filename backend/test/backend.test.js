const { test, describe, before, after } = require('node:test');
const assert = require('node:assert');
const http = require('node:http');

// Set test environment
process.env.NODE_ENV = 'test';
process.env.CLIENT_URL = 'http://localhost:3000,http://staging.grocery.local';
process.env.JWT_SECRET = 'staging_jwt_secret_test_value_12345';
process.env.RAZORPAY_KEY_ID = 'rzp_test_stagingKeyId123';
process.env.RAZORPAY_KEY_SECRET = 'stagingRazorpaySecret456';
process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/grocery_staging_db';

const { app } = require('../src/server');

let testServer;
let baseUrl;

// Helper to make HTTP requests
const request = (path, options = {}) => {
    return new Promise((resolve, reject) => {
        const url = new URL(path, baseUrl);
        const reqOptions = {
            method: options.method || 'GET',
            headers: options.headers || {}
        };

        const req = http.request(url, reqOptions, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                let parsed;
                try {
                    parsed = JSON.parse(body);
                } catch {
                    parsed = body;
                }
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    body: parsed
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

describe('Staging Backend Test Suite', () => {
    before((t, done) => {
        // Start test server on random port
        testServer = app.listen(0, () => {
            const port = testServer.address().port;
            baseUrl = `http://127.0.0.1:${port}`;
            done();
        });
    });

    after((t, done) => {
        testServer.close(done);
    });

    test('1. Root endpoint GET / returns "API is running..."', async () => {
        const res = await request('/');
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body, 'API is running...');
    });

    test('2. Health check endpoint GET /api/health responds with status and DB readiness', async () => {
        const res = await request('/api/health');
        // If DB not connected in test, returns 503 degraded; if connected returns 200
        assert.ok([200, 503].includes(res.status));
        assert.ok(res.body.status === 'ok' || res.body.status === 'degraded');
        assert.strictEqual(res.body.environment, 'test');
        assert.ok(typeof res.body.uptime === 'number');
        assert.ok(typeof res.body.timestamp === 'string');
        assert.ok(res.body.database);
    });

    test('3. Health check alias GET /health responds correctly', async () => {
        const res = await request('/health');
        assert.ok([200, 503].includes(res.status));
        assert.ok(res.body.status === 'ok' || res.body.status === 'degraded');
    });

    test('4. Strict CORS allows configured origin and returns CORS headers', async () => {
        const res = await request('/api/health', {
            headers: {
                Origin: 'http://staging.grocery.local'
            }
        });
        assert.strictEqual(res.headers['access-control-allow-origin'], 'http://staging.grocery.local');
    });

    test('5. Strict CORS blocks unauthorized cross-origin requests', async () => {
        const res = await request('/api/health', {
            headers: {
                Origin: 'http://evil-attacker-website.com'
            }
        });
        // Blocked CORS request either yields error or does not echo evil origin
        assert.notStrictEqual(res.headers['access-control-allow-origin'], 'http://evil-attacker-website.com');
    });

    test('6. Protected endpoint GET /api/auth/me rejects unauthenticated request (401)', async () => {
        const res = await request('/api/auth/me');
        assert.strictEqual(res.status, 401);
        assert.strictEqual(res.body.success, false);
    });

    test('7. Protected endpoint GET /api/orders rejects unauthenticated request (401)', async () => {
        const res = await request('/api/orders');
        assert.strictEqual(res.status, 401);
        assert.strictEqual(res.body.success, false);
    });

    test('8. Rate limit headers are present on /api requests', async () => {
        const res = await request('/api/auth/me');
        assert.ok(res.headers['ratelimit-limit'] || res.headers['x-ratelimit-limit']);
    });

    test('9. Invalid payment verification signature is rejected with 400', async () => {
        const res = await request('/api/payments/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                razorpay_order_id: 'order_test_123',
                razorpay_payment_id: 'pay_test_456',
                razorpay_signature: 'invalid_tampered_signature_789'
            }
        });
        // Should require auth (401) or reject signature (400)
        assert.ok([400, 401].includes(res.status));
    });
});
