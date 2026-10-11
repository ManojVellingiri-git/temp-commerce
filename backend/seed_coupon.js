require('dotenv').config();
const connectDB = require('./src/config/db');
const Coupon = require('./src/models/Coupon');
(async () => {
  await connectDB();
  await Coupon.create({ code: 'TEST10', discountType: 'percentage', discountValue: 10, minimumOrder: 100, isActive: true, startDate: new Date(), endDate: new Date(Date.now() + 86400000) });
  console.log('Coupon created');
  process.exit(0);
})();
