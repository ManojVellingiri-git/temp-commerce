require('dotenv').config();
const mongoose = require('mongoose');
const crypto = require('crypto');
const connectDB = require('./src/config/db');
const Order = require('./src/models/Order');
const Product = require('./src/models/Product');

(async () => {
  await connectDB();
  
  // 1. Setup product
  const product = await Product.findOne({ slug: 'nutrichoice-digestive' });
  await Product.updateOne({ _id: product._id }, { $set: { stockQuantity: 5 } });
  
  // 2. Create Pending Order
  const orderId = 'order_mock_' + Date.now();
  const paymentId = 'pay_mock_' + Date.now();
  
  const pendingOrder = new Order({
      user: '6aca1fd38d09797c2e238bcd', // test user
      customerName: 'Test User',
      customerEmail: 'test@example.com',
      items: [{
          product: product._id,
          name: product.name,
          price: product.price,
          quantity: 2
      }],
      shippingAddress: { street: '123', city: 'City', state: 'State', zipCode: '111', country: 'Country' },
      subtotal: product.price * 2,
      discount: 0,
      deliveryFee: 0,
      tax: 0,
      total: product.price * 2,
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
