const Category = require('../models/Category');

const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({});
        res.json({ success: true, data: categories });
    } catch (error) { next(error); }
};

const getCategoryById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) res.json({ success: true, data: category });
        else { res.status(404); throw new Error('Category not found'); }
    } catch (error) { next(error); }
};

const createCategory = async (req, res, next) => {
    try {
        const category = new Category(req.body);
        const createdCategory = await category.save();
        res.status(201).json({ success: true, data: createdCategory });
    } catch (error) { next(error); }
};

const updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (category) res.json({ success: true, data: category });
        else { res.status(404); throw new Error('Category not found'); }
    } catch (error) { next(error); }
};

const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            await Category.deleteOne({ _id: category._id });
            res.json({ success: true, message: 'Category removed' });
        } else { res.status(404); throw new Error('Category not found'); }
    } catch (error) { next(error); }
};

module.exports = { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
