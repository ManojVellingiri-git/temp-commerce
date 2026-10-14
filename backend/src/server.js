require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// Connect to database in non-test mode
if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

const app = express();

// Trust proxy if behind reverse proxy / load balancer (critical for staging HTTPS & rate limiting)
app.set('trust proxy', 1);

// Safe HTTP request logger (no sensitive headers or bodies logged)
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        // Don't flood logs with container health probes
        if (req.originalUrl !== '/health' && req.originalUrl !== '/api/health') {
            console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
        }
    });
    next();
});

// Strict CORS configuration supporting single or comma-separated allowed origins
const rawClientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
const allowedOrigins = rawClientUrl.split(',').map(s => s.trim()).filter(Boolean);

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
            callback(null, true);
        } else {
            callback(new Error(`CORS blocked: Origin ${origin} not allowed`));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '10kb' })); // Limit body size

// Prevent NoSQL injection safely for Express 5
app.use((req, res, next) => {
    if (req.body) mongoSanitize.sanitize(req.body);
    if (req.params) mongoSanitize.sanitize(req.params);
    next();
});

// Health check endpoints (available before rate limiter so orchestrator probes are never throttled)
app.get(['/health', '/api/health'], (req, res) => {
    const isDbConnected = mongoose.connection.readyState === 1;
    res.status(200).json({
        status: isDbConnected ? 'ok' : 'degraded',
        timestamp: new Date().toISOString(),
        uptime: Math.floor(process.uptime()),
        environment: process.env.NODE_ENV || 'staging',
        database: {
            status: isDbConnected ? 'connected' : 'disconnected',
            readyState: mongoose.connection.readyState
        }
    });
});

// Global Rate Limiter
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api', globalLimiter);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/coupons', require('./routes/couponRoutes'));
app.use('/api/banners', require('./routes/bannerRoutes'));

// Root route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
let server;

if (process.env.NODE_ENV !== 'test') {
    server = app.listen(PORT, '0.0.0.0', () => console.log(`Server running in ${process.env.NODE_ENV || 'staging'} mode on port ${PORT}`));
}

// Graceful shutdown handling
const gracefulShutdown = async (signal) => {
    console.log(`\nReceived ${signal}. Gracefully shutting down server...`);
    if (server) {
        server.close(async () => {
            console.log('HTTP server closed.');
            try {
                await mongoose.connection.close(false);
                console.log('MongoDB connection closed.');
                process.exit(0);
            } catch (err) {
                console.error('Error during MongoDB disconnection:', err);
                process.exit(1);
            }
        });
    } else {
        process.exit(0);
    }

    setTimeout(() => {
        console.error('Graceful shutdown timeout exceeded. Forcing exit.');
        process.exit(1);
    }, 10000).unref();
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

module.exports = { app, server };
