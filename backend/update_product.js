require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const Product = require('./src/models/Product');
(async () => {
  await connectDB();
  await Product.updateOne({ slug: 'nutrichoice-digestive' }, { $set: { stockQuantity: 10 } });
  console.log('Product updated');
  process.exit(0);
})();
