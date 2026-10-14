const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    shortDescription: { type: String },
    brand: { type: String },
    category: { type: String, required: true },
    image: { type: String },
    images: [{ type: String }],
    price: { type: Number, required: true, default: 0 },
    originalPrice: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    unit: { type: String },
    weight: { type: String },
    sku: { type: String },
    barcode: { type: String, index: true },
    gst: { type: Number, default: 0 },
    originalDescription: { type: String },
    requiresGenuineImage: { type: Boolean, default: false },
    importBatch: { type: String },
    stock: { type: Boolean, default: true },
    stockQuantity: { type: Number, default: 0 },
    lowStockThreshold: { type: Number, default: 5 },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    isNewProduct: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
