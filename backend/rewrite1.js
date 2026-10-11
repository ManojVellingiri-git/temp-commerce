const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src/controllers/paymentController.js');
let code = fs.readFileSync(file, 'utf8');

// Replace createPaymentOrder
code = code.replace(/\/\/ 3\. Create Razorpay order[\s\S]*?res\.status\(200\)\.json\(\{[\s\S]*?\}\);/m, // 3. Create Razorpay order
        const razorpay = getRazorpayInstance();
        const amountInPaise = Math.round(total * 100);

        const options = {
            amount: amountInPaise,
            currency: 'INR',
            receipt: 'receipt_' + req.user._id + '_' + Date.now(),
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

        res.status(200).json({
            success: true,
            data: {
                razorpayOrderId: razorpayOrder.id,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                key: process.env.RAZORPAY_KEY_ID,
                calculated: {
                    subtotal, discount, deliveryFee, tax, total, verifiedItems
                }
            }
        }););

fs.writeFileSync(file, code);
console.log('Replaced createPaymentOrder');
