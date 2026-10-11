const Order = require('../models/Order');

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name email');
        res.json({ success: true, data: orders });
    } catch (error) {
        next(error);
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my
// @access  Private
const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json({ success: true, data: orders });
    } catch (error) {
        next(error);
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if (order) {
            // Check if it's the user's order or an admin
            if (req.user.role !== 'admin' && order.user._id.toString() !== req.user._id.toString()) {
                res.status(403);
                throw new Error('Not authorized to view this order');
            }
            res.json({ success: true, data: order });
        } else {
            res.status(404);
            throw new Error('Order not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res, next) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
        
        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error('No order items');
        } else {
            const order = new Order({
                user: req.user._id,
                orderItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            });
            const createdOrder = await order.save();
            res.status(201).json({ success: true, data: createdOrder });
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = req.body.status || order.status;
            const updatedOrder = await order.save();
            res.json({ success: true, data: updatedOrder });
        } else {
            res.status(404);
            throw new Error('Order not found');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { getOrders, getMyOrders, getOrderById, createOrder, updateOrderStatus };
