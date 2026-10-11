const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    variant: { type: String },
    image: { type: String }
});

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional for guest checkout for now
    customerName: { type: String },
    customerEmail: { type: String },
    customerPhone: { type: String },
    items: [orderItemSchema],
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    subtotal: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: 0 },
    deliveryFee: { type: Number, required: true, default: 0 },
    tax: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true, default: 0 },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Processing', 'Paid', 'Failed', 'Refunded'], default: 'Pending' },
    orderStatus: { type: String, enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
