import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import { products as initialProducts } from '../../data/products';

const Products = () => {
    // In a real app this would be fetched from API
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Mock API call to get products
        const savedProducts = localStorage.getItem('admin_mock_products');
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        } else {
            setProducts(initialProducts);
            localStorage.setItem('admin_mock_products', JSON.stringify(initialProducts));
        }
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product? (Mock frontend deletion only)")) {
            const updated = products.filter(p => p.id !== id);
            setProducts(updated);
            localStorage.setItem('admin_mock_products', JSON.stringify(updated));
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h3 mb-0">Products</h2>
                <Link to="/admin/products/new" className="btn btn-primary">
                    <i className="bi bi-plus-lg me-2"></i>Add Product
                </Link>
            </div>
            
            <div className="card shadow-sm border-0">
                <div className="card-header bg-white py-3 d-flex align-items-center gap-3">
                    <div className="input-group" style={{maxWidth: '300px'}}>
                        <span className="input-group-text bg-white"><i className="bi bi-search"></i></span>
                        <input type="text" className="form-control border-start-0 ps-0" placeholder="Search products..." />
                    </div>
                    <select className="form-select w-auto">
                        <option>All Categories</option>
                        <option>Snacks & Munchies</option>
                        <option>Bakery & Biscuits</option>
                    </select>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img src={product.image} alt={product.name} className="rounded" style={{width: '40px', height: '40px', objectFit: 'cover'}} />
                                            <div className="ms-3">
                                                <h6 className="mb-0 text-truncate" style={{maxWidth: '200px'}}>{product.name}</h6>
                                                <small className="text-muted">{product.unit || product.weight}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product.category}</td>
                                    <td>${product.price}</td>
                                    <td>{product.discount > 0 ? `${product.discount}%` : '-'}</td>
                                    <td>
                                        {product.stock ? (
                                            <span className="text-success"><i className="bi bi-check-circle me-1"></i>In Stock</span>
                                        ) : (
                                            <span className="text-danger"><i className="bi bi-x-circle me-1"></i>Out of Stock</span>
                                        )}
                                    </td>
                                    <td><StatusBadge status={product.stock ? 'Active' : 'Out of Stock'} /></td>
                                    <td>
                                        <div className="btn-group">
                                            <Link to={`/admin/products/edit/${product.id}`} className="btn btn-sm btn-light text-primary" title="Edit">
                                                <i className="bi bi-pencil"></i>
                                            </Link>
                                            <button className="btn btn-sm btn-light text-danger" title="Delete" onClick={() => handleDelete(product.id)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer bg-white py-3">
                    <nav>
                        <ul className="pagination justify-content-end mb-0">
                            <li className="page-item disabled"><a className="page-link" href="#!">Previous</a></li>
                            <li className="page-item active"><a className="page-link" href="#!">1</a></li>
                            <li className="page-item"><a className="page-link" href="#!">2</a></li>
                            <li className="page-item"><a className="page-link" href="#!">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Products;
