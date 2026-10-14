const mongoose = require('mongoose');

let isConnecting = false;
let retryCount = 0;
const MAX_RETRIES = 5;
let lastError = null;

const sanitizeError = (err) => {
    if (!err || !err.message) return 'Unknown database error';
    return err.message.replace(/mongodb(\+srv)?:\/\/[^@]+@/gi, 'mongodb$1://***:***@');
};

const connectDB = async () => {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) {
        lastError = 'Database URI not configured (MONGODB_URI or MONGO_URI required)';
        console.warn('MongoDB Warning: Database URI not configured (MONGODB_URI or MONGO_URI required). Running without active database connection.');
        return null;
    }

    if (mongoose.connection.readyState === 1) {
        lastError = null;
        retryCount = 0;
        return mongoose.connection;
    }

    if (isConnecting) {
        return null;
    }

    try {
        isConnecting = true;
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
        });
        isConnecting = false;
        retryCount = 0;
        lastError = null;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        isConnecting = false;
        const sanitizedMsg = sanitizeError(error);
        lastError = sanitizedMsg;
        console.error(`MongoDB Connection Error (attempt ${retryCount + 1}/${MAX_RETRIES}): ${sanitizedMsg}`);

        if (process.env.NODE_ENV === 'test') {
            throw error;
        }

        if (retryCount < MAX_RETRIES) {
            retryCount++;
            const backoffMs = Math.min(5000 * Math.pow(1.5, retryCount - 1), 30000);
            console.log(`MongoDB: Scheduling reconnection attempt ${retryCount}/${MAX_RETRIES} in ${Math.round(backoffMs / 1000)}s...`);
            setTimeout(connectDB, backoffMs).unref();
        } else {
            console.error(`MongoDB: Maximum retry attempts (${MAX_RETRIES}) reached. Automatic retries halted to prevent log flooding. Original error: ${sanitizedMsg}`);
        }
        return null;
    }
};

mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected. Network disruption or database closed.');
});

mongoose.connection.on('reconnected', () => {
    retryCount = 0;
    lastError = null;
    console.log('MongoDB reconnected successfully.');
});

const getDbState = () => ({
    status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    readyState: mongoose.connection.readyState,
    configured: Boolean(process.env.MONGODB_URI || process.env.MONGO_URI),
    ...(lastError && mongoose.connection.readyState !== 1 ? { error: lastError } : {})
});

module.exports = connectDB;
module.exports.connectDB = connectDB;
module.exports.getDbState = getDbState;

