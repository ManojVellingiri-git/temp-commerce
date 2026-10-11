const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
        if (!uri) {
            throw new Error('Database URI not configured (MONGODB_URI or MONGO_URI required)');
        }
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        if (process.env.NODE_ENV !== 'test') {
            process.exit(1);
        }
        throw error;
    }
};

module.exports = connectDB;
