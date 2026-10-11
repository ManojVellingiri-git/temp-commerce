const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 auth requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many authentication attempts, please try again later.' }
});

router.post('/register', authLimiter, registerUser);
router.post('/login', authLimiter, loginUser);
router.route('/me').get(protect, getMe).put(protect, updateProfile);

module.exports = router;
