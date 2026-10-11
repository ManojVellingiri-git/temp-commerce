require('dotenv').config();
const mongoose = require('mongoose');
const crypto = require('crypto');
const connectDB = require('./src/config/db');
const Order = require('./src/models/Order');
const Product = require('./src/models/Product');

(async () => {
  await connectDB();
  
  // 1. Setup product stock to exactly 2
  const product = await Product.findOne({ slug: 'nutrichoice-digestive' });
  await Product.updateOne({ _id: product._id }, { $set: { stockQuantity: 2 } });
  
  // 2. Create Pending Order B (Order A is the one we verified earlier, which already reduced stock, but wait we reset it to 5 earlier and verified 2, so it's 3 now. Let's just create Order B)
  const orderId = 'order_fail_mock_' + Date.now();
  const paymentId = 'pay_fail_mock_' + Date.now();
  
  const pendingOrder = new Order({
      user: '6aca1fd38d09797c2e238bcd', // test user
      customerName: 'Test User',
      customerEmail: 'test@example.com',
      items: [{
          product: product._id,
          name: product.name,
          price: product.price,
          quantity: 3 // Needs 3, but stock is 2
      }],
      shippingAddress: { street: '123', city: 'City', state: 'State', zipCode: '111', country: 'Country' },
      subtotal: product.price * 3,
      discount: 0,
      deliveryFee: 0,
      tax: 0,
      total: product.price * 3,
      paymentMethod: 'Razorpay',
      paymentStatus: 'Pending',
      orderStatus: 'Pending',
      razorpayOrderId: orderId
  });
  await pendingOrder.save();
  
  // 3. Generate signature
  const secret = process.env.RAZORPAY_KEY_SECRET;
  const signature = crypto.createHmac('sha256', secret).update(orderId + '|' + paymentId).digest('hex');
  
  console.log(JSON.stringify({ orderId, paymentId, signature }));
  process.exit(0);
})();
