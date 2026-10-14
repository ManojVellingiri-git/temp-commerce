const mongoose = require('mongoose');

let isConnecting = false;

const connectDB = async () => {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) {
        console.warn('MongoDB Warning: Database URI not configured (MONGODB_URI or MONGO_URI required). Running without active database connection.');
        return null;
    }

    if (mongoose.connection.readyState === 1 || isConnecting) {
        return mongoose.connection;
    }

    try {
        isConnecting = true;
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
        });
        isConnecting = false;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        isConnecting = false;
        console.error(`MongoDB Connection Error: ${error.message}`);
        if (process.env.NODE_ENV === 'test') {
            throw error;
        }
        setTimeout(connectDB, 10000).unref();
        return null;
    }
};

module.exports = connectDB;
