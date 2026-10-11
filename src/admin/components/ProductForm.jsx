import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../data/categories';

const ProductForm = ({ isEdit, initialData }) => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        brand: '',
        category: '',
        description: '',
        price: '',
        originalPrice: '',
        discount: '',
        stockQuantity: '',
        lowStockThreshold: '5',
        availability: true,
        unit: '',
        weight: '',
        seoTitle: '',
        seoDescription: '',
        slug: ''
    });

    useEffect(() => {
        if (isEdit && initialData) {
            setFormData(prev => ({
                ...prev,
                ...initialData
            }));
        }
    }, [isEdit, initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, POST or PUT request here
        alert(`Product successfully ${isEdit ? 'updated' : 'created'}! (Mock Action)`);
        navigate('/admin/products');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row g-4">
                <div className="col-12 col-xl-8">
                    {/* Basic Information */}
                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-header bg-white py-3">
                            <h5 className="mb-0">Basic Information</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Product Name</label>
                                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">SKU</label>
                                    <input type="text" className="form-control" name="sku" value={formData.sku} onChange={handleChange} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Brand</label>
                                    <input type="text" className="form-control" name="brand" value={formData.brand} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Category</label>
                                <select className="form-select" name="category" value={formData.category} onChange={handleChange} required>
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea className="form-control" name="description" rows="5" value={formData.description} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-header bg-white py-3">
                            <h5 className="mb-0">Pricing</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Regular Price ($)</label>
                                    <input type="number" step="0.01" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Original Price ($)</label>
                                    <input type="number" step="0.01" className="form-control" name="originalPrice" value={formData.originalPrice} onChange={handleChange} />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Discount (%)</label>
                                    <input type="number" className="form-control" name="discount" value={formData.discount} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inventory & Product */}
                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-header bg-white py-3">
                            <h5 className="mb-0">Inventory & Specification</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Stock Quantity</label>
                                    <input type="number" className="form-control" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Low Stock Threshold</label>
                                    <input type="number" className="form-control" name="lowStockThreshold" value={formData.lowStockThreshold} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Unit</label>
                                    <input type="text" className="form-control" name="unit" placeholder="e.g. 250g, 1 kg" value={formData.unit} onChange={handleChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Weight</label>
                                    <input type="text" className="form-control" name="weight" value={formData.weight} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-check form-switch mt-2">
                                <input className="form-check-input" type="checkbox" role="switch" name="availability" id="availabilityCheck" checked={formData.availability} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="availabilityCheck">Product is active and available for purchase</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-xl-4">
                    {/* Media */}
                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-header bg-white py-3">
                            <h5 className="mb-0">Product Image</h5>
                        </div>
                        <div className="card-body text-center">
                            <div className="border border-dashed border-secondary rounded p-5 bg-light mb-3">
                                <i className="bi bi-cloud-arrow-up display-4 text-muted"></i>
                                <p className="mt-2 mb-0">Drag and drop image here or</p>
                                <button type="button" className="btn btn-sm btn-outline-primary mt-2">Browse Files</button>
                            </div>
                            <small className="text-muted">Recommended resolution: 800x800. Max file size: 2MB.</small>
                        </div>
                    </div>

                    {/* SEO */}
                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-header bg-white py-3">
                            <h5 className="mb-0">SEO Optimization</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">SEO Title</label>
                                <input type="text" className="form-control" name="seoTitle" value={formData.seoTitle} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">SEO Description</label>
                                <textarea className="form-control" rows="3" name="seoDescription" value={formData.seoDescription} onChange={handleChange}></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">URL Slug</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light">/product/</span>
                                    <input type="text" className="form-control" name="slug" value={formData.slug} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary btn-lg">
                            {isEdit ? 'Update Product' : 'Create Product'}
                        </button>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin/products')}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ProductForm;
