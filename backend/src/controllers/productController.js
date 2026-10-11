const Product = require('../models/Product');

// @desc    Fetch all products with filtering, sorting, pagination
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
    try {
        const { search, category, brand, minPrice, maxPrice, sort, page = 1, limit = 20 } = req.query;

        let query = {};
        if (search) query.name = { $regex: search, $options: 'i' };
        if (category) query.category = category;
        if (brand) query.brand = brand;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        let sortOption = {};
        if (sort === 'price_asc') sortOption = { price: 1 };
        else if (sort === 'price_desc') sortOption = { price: -1 };
        else sortOption = { createdAt: -1 }; // Default new

        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;

        const total = await Product.countDocuments(query);
        const products = await Product.find(query).sort(sortOption).skip(skip).limit(limitNum);

        res.json({
            success: true,
            data: {
                products,
                page: pageNum,
                limit: limitNum,
                total,
                totalPages: Math.ceil(total / limitNum)
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json({ success: true, data: product });
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res, next) => {
    try {
        const product = new Product(req.body);
        const createdProduct = await product.save();
        res.status(201).json({ success: true, data: createdProduct });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (product) {
            res.json({ success: true, data: product });
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await Product.deleteOne({ _id: product._id });
            res.json({ success: true, message: 'Product removed' });
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
