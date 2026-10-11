const express = require('express');
const router = express.Router();
const { createPaymentOrder, verifyPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const rateLimit = require('express-rate-limit');

const paymentLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20, // Limit each IP to 20 payment requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many payment requests, please try again later.' }
});

router.post('/create-order', protect, paymentLimiter, createPaymentOrder);
router.post('/verify', protect, paymentLimiter, verifyPayment);

module.exports = router;
