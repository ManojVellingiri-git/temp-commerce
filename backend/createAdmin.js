require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');

const createAdmin = async () => {
    try {
        await connectDB();
        
        const adminEmail = process.argv[2] || 'admin@admin.com';
        const adminPassword = process.argv[3] || 'admin123';
        
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log('Admin user already exists!');
            process.exit(1);
        }

        await User.create({
            name: 'System Admin',
            email: adminEmail,
            password: adminPassword,
            role: 'admin'
        });

        console.log(`Admin user created safely: ${adminEmail}`);
        process.exit();
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

createAdmin();
