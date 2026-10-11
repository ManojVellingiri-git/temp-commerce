const Banner = require('../models/Banner');

const getBanners = async (req, res, next) => {
    try {
        const banners = await Banner.find({});
        res.json({ success: true, data: banners });
    } catch (error) { next(error); }
};

const createBanner = async (req, res, next) => {
    try {
        const banner = new Banner(req.body);
        const createdBanner = await banner.save();
        res.status(201).json({ success: true, data: createdBanner });
    } catch (error) { next(error); }
};

const updateBanner = async (req, res, next) => {
    try {
        const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (banner) res.json({ success: true, data: banner });
        else { res.status(404); throw new Error('Banner not found'); }
    } catch (error) { next(error); }
};

const deleteBanner = async (req, res, next) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (banner) {
            await Banner.deleteOne({ _id: banner._id });
            res.json({ success: true, message: 'Banner removed' });
        } else { res.status(404); throw new Error('Banner not found'); }
    } catch (error) { next(error); }
};

module.exports = { getBanners, createBanner, updateBanner, deleteBanner };
