require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/config/db');

// Models
const Product = require('./src/models/Product');
const Category = require('./src/models/Category');
const Order = require('./src/models/Order');
const User = require('./src/models/User');
const Coupon = require('./src/models/Coupon');
const Banner = require('./src/models/Banner');

// Data
// The frontend uses export const, so we will use dynamic import or parse it manually if it's not a commonjs module.
// However, since it's a script, let's create a temporary frontend bridge or redefine the mock data.
// Since the frontend is in React (ES6 modules), reading it directly from Node.js might fail if it uses 'export const'.
// For this seeder, we will convert the ES6 modules to CommonJS compatible mock arrays for initial seeding.

const mockCategories = [
    { name: 'Dairy, Bread & Eggs', slug: 'dairy-bread-eggs', image: '/images/category/category-dairy-bread-eggs.jpg' },
    { name: 'Snacks & Munchies', slug: 'snacks-munchies', image: '/images/category/category-snack-munchies.jpg' },
    { name: 'Bakery & Biscuits', slug: 'bakery-biscuits', image: '/images/category/category-bakery-biscuits.jpg' },
    { name: 'Cold Drinks & Juices', slug: 'cold-drinks-juices', image: '/images/category/category-cold-drinks-juices.jpg' },
    { name: 'Instant Food', slug: 'instant-food', image: '/images/category/category-instant-food.jpg' }
];

const mockProducts = [
    { name: "Haldiram's Sev Bhujia", slug: 'haldirams-sev-bhujia', category: 'Snacks & Munchies', price: 18, originalPrice: 24, discount: 20, unit: '400g', stock: true, rating: 4.5, reviewCount: 12 },
    { name: 'NutriChoice Digestive', slug: 'nutrichoice-digestive', category: 'Bakery & Biscuits', price: 24, originalPrice: 30, discount: 15, unit: '250g', stock: true, rating: 4.3, reviewCount: 45 },
    { name: 'Cadbury 5 Star Chocolate', slug: 'cadbury-5-star', category: 'Snacks & Munchies', price: 32, originalPrice: 35, discount: 8, unit: '1 kg', stock: true, rating: 4.8, reviewCount: 200 },
    { name: 'Onion Flavour Potato', slug: 'onion-flavour-potato', category: 'Snacks & Munchies', price: 3, originalPrice: 5, discount: 10, unit: '250g', stock: false, rating: 3.5, reviewCount: 5 }
];

const importData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Product.deleteMany();
        await Category.deleteMany();
        await Order.deleteMany();
        await User.deleteMany();
        await Coupon.deleteMany();
        await Banner.deleteMany();

        // Insert mock data
        await Category.insertMany(mockCategories);
        await Product.insertMany(mockProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();

        await Product.deleteMany();
        await Category.deleteMany();
        await Order.deleteMany();
        await User.deleteMany();
        await Coupon.deleteMany();
        await Banner.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
