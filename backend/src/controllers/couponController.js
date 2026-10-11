const Coupon = require('../models/Coupon');

const getCoupons = async (req, res, next) => {
    try {
        const coupons = await Coupon.find({});
        res.json({ success: true, data: coupons });
    } catch (error) { next(error); }
};

const createCoupon = async (req, res, next) => {
    try {
        const coupon = new Coupon(req.body);
        const createdCoupon = await coupon.save();
        res.status(201).json({ success: true, data: createdCoupon });
    } catch (error) { next(error); }
};

const updateCoupon = async (req, res, next) => {
    try {
        const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (coupon) res.json({ success: true, data: coupon });
        else { res.status(404); throw new Error('Coupon not found'); }
    } catch (error) { next(error); }
};

const deleteCoupon = async (req, res, next) => {
    try {
        const coupon = await Coupon.findById(req.params.id);
        if (coupon) {
            await Coupon.deleteOne({ _id: coupon._id });
            res.json({ success: true, message: 'Coupon removed' });
        } else { res.status(404); throw new Error('Coupon not found'); }
    } catch (error) { next(error); }
};

module.exports = { getCoupons, createCoupon, updateCoupon, deleteCoupon };
