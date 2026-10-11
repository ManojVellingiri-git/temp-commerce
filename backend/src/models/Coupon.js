const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
    discountValue: { type: Number, required: true },
    minimumOrder: { type: Number, default: 0 },
    maximumDiscount: { type: Number },
    usageLimit: { type: Number, default: null }, // null means unlimited
    usedCount: { type: Number, default: 0 },
    startDate: { type: Date },
    endDate: { type: Date },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon;
