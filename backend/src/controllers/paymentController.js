const Razorpay = require('razorpay');
const crypto = require('crypto');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Create Razorpay instance lazily or safely
const getRazorpayInstance = () => {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        throw new Error('Razorpay keys are not configured');
    }
    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
};

// @desc    Calculate Order Total & Create Razorpay Order
// @route   POST /api/payments/create-order
// @access  Private
const createPaymentOrder = async (req, res, next) => {
    try {
        const { items, address, couponCode } = req.body;
        
        if (!Array.isArray(items) || items.length === 0) {
            res.status(400);
            throw new Error('Items must be a non-empty array');
        }
        
        if (!address || typeof address !== 'object' || !address.street || !address.city || !address.state || !address.zipCode || !address.country) {
            res.status(400);
            throw new Error('Valid shipping address object with street, city, state, zipCode, country is required');
        }

        if (couponCode && typeof couponCode !== 'string') {
            res.status(400);
            throw new Error('Coupon code must be a string if provided');
        }

        // Validate each item
        for (const item of items) {
            if (!item.productId || typeof item.productId !== 'string' || item.productId.length !== 24) {
                res.status(400);
                throw new Error('Invalid product ID format');
            }
            if (!item.quantity || !Number.isInteger(item.quantity) || item.quantity <= 0 || item.quantity > 100) {
                res.status(400);
                throw new Error(`Invalid quantity for product ${item.productId}. Must be a positive integer <= 100`);
            }
        }

        // 1. Fetch products from MongoDB and calculate amounts safely
        let subtotal = 0;
        const verifiedItems = [];

        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                res.status(400);
                throw new Error(`Product ${item.productId} not found`);
            }
            if (!product.isActive) {
                res.status(400);
                throw new Error(`Product ${product.name} is currently inactive`);
            }
            if (product.stockQuantity < item.quantity) {
                res.status(400);
                throw new Error(`Insufficient stock for ${product.name}. Available: ${product.stockQuantity}`);
            }

            // Use the authoritative DB price
            const price = product.price;
            subtotal += price * item.quantity;

            verifiedItems.push({
                product: product._id,
                name: product.name,
                price: price,
                quantity: item.quantity,
                image: product.images && product.images.length > 0 ? product.images[0] : ''
            });
        }

        // 2. Calculate Delivery & Tax & Discount
        let discount = 0;
        if (couponCode) {
            const Coupon = require('../models/Coupon');
            const coupon = await Coupon.findOne({ code: couponCode, isActive: true });
            if (coupon) {
                const now = new Date();
                if ((!coupon.startDate || coupon.startDate <= now) && (!coupon.endDate || coupon.endDate >= now)) {
                    if (subtotal >= coupon.minimumOrder) {
                        if (coupon.discountType === 'percentage') {
                            discount = (subtotal * coupon.discountValue) / 100;
                            if (coupon.maximumDiscount && discount > coupon.maximumDiscount) {
                                discount = coupon.maximumDiscount;
                            }
                        } else if (coupon.discountType === 'fixed') {
                            discount = coupon.discountValue;
                        }
                        
                        // Optionally update usedCount (maybe should be done in verifyPayment)
                        // coupon.usedCount += 1;
                        // await coupon.save();
                    }
                }
            }
        }
        
        // Simple config logic for now: Free delivery over 50
        let deliveryFee = subtotal >= 50 ? 0 : 5;
        let tax = parseFloat((subtotal * 0.05).toFixed(2)); // 5% tax example
        let total = parseFloat((subtotal - discount + deliveryFee + tax).toFixed(2));

        // 3. Create Razorpay order
        const razorpay = getRazorpayInstance();
        
        // Razorpay accepts amount in smallest unit (paise for INR)
        // Ensure total is handled without precision loss by rounding safely
        const amountInPaise = Math.round(total * 100);

        const options = {
            amount: amountInPaise,
            currency: 'INR',
            receipt: `receipt_${req.user._id}_${Date.now()}`,
            payment_capture: 1
        };

        const razorpayOrder = await razorpay.orders.create(options);

        // 4. Create server-authoritative pending order
        const pendingOrder = new Order({
            user: req.user._id,
            customerName: req.user.name,
            customerEmail: req.user.email,
            customerPhone: req.user.phone,
            items: verifiedItems,
            shippingAddress: address,
            subtotal,
            discount,
            deliveryFee,
            tax,
            total,
            paymentMethod: 'Razorpay',
            paymentStatus: 'Pending',
            orderStatus: 'Pending',
            razorpayOrderId: razorpayOrder.id
        });
        
        await pendingOrder.save();

        // We do NOT trust the client anymore; we stored the pending order securely.
        res.status(200).json({
            success: true,
            data: {
                razorpayOrderId: razorpayOrder.id,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                key: process.env.RAZORPAY_KEY_ID, // Send the public key to frontend
                calculated: {
                    subtotal,
                    discount,
                    deliveryFee,
                    tax,
                    total,
                    verifiedItems
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Verify Razorpay payment signature & Create Order
// @route   POST /api/payments/verify
// @access  Private
const verifyPayment = async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = req.body;
        
        if (!razorpay_order_id || typeof razorpay_order_id !== 'string') {
            res.status(400);
            throw new Error('razorpay_order_id is required and must be a string');
        }
        if (!razorpay_payment_id || typeof razorpay_payment_id !== 'string') {
            res.status(400);
            throw new Error('razorpay_payment_id is required and must be a string');
        }
        if (!razorpay_signature || typeof razorpay_signature !== 'string') {
            res.status(400);
            throw new Error('razorpay_signature is required and must be a string');
        }

        if (!process.env.RAZORPAY_KEY_SECRET) {
            res.status(500);
            throw new Error('Server Razorpay config missing');
        }

        // 1. Verify Signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            res.status(400);
            throw new Error('Invalid payment signature');
        }

        // 1.5 Fetch actual payment status from Razorpay gateway
        let rzpPayment;
        try {
            const razorpay = getRazorpayInstance();
            rzpPayment = await razorpay.payments.fetch(razorpay_payment_id);
        } catch (fetchErr) {
            res.status(502);
            throw new Error('Failed to verify payment with gateway');
        }

        if (rzpPayment.order_id !== razorpay_order_id) {
            res.status(400);
            throw new Error('Payment does not match the provided order ID');
        }

        if (rzpPayment.status !== 'captured' && rzpPayment.status !== 'authorized') {
            res.status(400);
            throw new Error(`Payment is in an invalid state: ${rzpPayment.status}`);
        }

        // 2. Fetch and Lock Pending Order atomically to prevent duplicate simultaneous processing
        let pendingOrder = await Order.findOneAndUpdate(
            { razorpayOrderId: razorpay_order_id, user: req.user._id, paymentStatus: 'Pending' },
            { paymentStatus: 'Processing' },
            { new: true }
        );

        if (!pendingOrder) {
            const existingOrder = await Order.findOne({ razorpayOrderId: razorpay_order_id, user: req.user._id });
            if (!existingOrder) {
                res.status(404);
                throw new Error('Pending order not found');
            }
            if (['Paid', 'Processing', 'Refunded', 'Failed'].includes(existingOrder.paymentStatus)) {
                return res.status(200).json({ success: true, data: existingOrder });
            }
            // Fallback for typescript or unusual states
            pendingOrder = existingOrder;
        }

        // Validate gateway amount against our DB
        const expectedAmount = Math.round(pendingOrder.total * 100);
        if (rzpPayment.amount !== expectedAmount || rzpPayment.currency !== 'INR') {
            res.status(400);
            throw new Error(`Payment amount mismatch. Expected: ${expectedAmount}, Got: ${rzpPayment.amount}`);
        }

        // 3. Deduct inventory safely with rollback capability
        let stockDeducted = [];
        try {
            for (const item of pendingOrder.items) {
                const updatedProduct = await Product.findOneAndUpdate(
                    { _id: item.product, stockQuantity: { $gte: item.quantity } },
                    { $inc: { stockQuantity: -item.quantity } },
                    { new: true }
                );

                if (!updatedProduct) {
                    throw new Error(`Insufficient stock for ${item.name} during finalize`);
                }
                stockDeducted.push(item);
            }
        } catch (stockError) {
            // Rollback already deducted stock
            for (const item of stockDeducted) {
                await Product.updateOne(
                    { _id: item.product },
                    { $inc: { stockQuantity: item.quantity } }
                );
            }
            
            pendingOrder.paymentStatus = 'Refunded';
            pendingOrder.orderStatus = 'Cancelled';
            await pendingOrder.save();
            
            // Initiate Real Razorpay Refund
            try {
                const razorpay = getRazorpayInstance();
                await razorpay.payments.refund(razorpay_payment_id, {
                    amount: Math.round(pendingOrder.total * 100),
                    notes: {
                        reason: 'Stock unavailable during finalization',
                        orderId: pendingOrder._id.toString()
                    }
                });
                res.status(400);
                throw new Error('Stock unavailable. Your payment has been refunded automatically.');
            } catch (refundError) {
                console.error("Razorpay Refund Error:", refundError);
                res.status(500);
                throw new Error('Stock unavailable. Automatic refund failed. Please contact support with Payment ID: ' + razorpay_payment_id);
            }
        }

        // 4. Update the Final Order in Database
        pendingOrder.paymentStatus = 'Paid';
        pendingOrder.orderStatus = 'Confirmed';
        pendingOrder.razorpayPaymentId = razorpay_payment_id;

        const updatedOrder = await pendingOrder.save();

        res.status(200).json({ success: true, data: updatedOrder });

    } catch (error) {
        next(error);
    }
};

module.exports = { createPaymentOrder, verifyPayment };
