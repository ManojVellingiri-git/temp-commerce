const User = require('../models/User');

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select('-password');
        res.json({ success: true, data: users });
    } catch (error) { next(error); }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (user) res.json({ success: true, data: user });
        else { res.status(404); throw new Error('User not found'); }
    } catch (error) { next(error); }
};

module.exports = { getUsers, getUserById };
