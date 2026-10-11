import React, { useState, useEffect } from 'react';
import StatusBadge from '../components/StatusBadge';
import { products as initialProducts } from '../../data/products';

const Inventory = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const savedProducts = localStorage.getItem('admin_mock_products');
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        } else {
            setProducts(initialProducts);
        }
    }, []);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h3 mb-0">Inventory</h2>
            </div>
            
            <div className="card shadow-sm border-0">
                <div className="card-header bg-white py-3 d-flex align-items-center gap-3">
                    <div className="input-group" style={{maxWidth: '300px'}}>
                        <span className="input-group-text bg-white"><i className="bi bi-search"></i></span>
                        <input type="text" className="form-control border-start-0 ps-0" placeholder="Search inventory..." />
                    </div>
                    <select className="form-select w-auto">
                        <option>All Statuses</option>
                        <option>In Stock</option>
                        <option>Low Stock</option>
                        <option>Out of Stock</option>
                    </select>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Product</th>
                                <th>SKU</th>
                                <th>Stock</th>
                                <th>Threshold</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, idx) => {
                                const stock = product.stock ? Math.floor(Math.random() * 50) + 1 : 0;
                                const threshold = 5;
                                let status = 'In Stock';
                                if (stock === 0) status = 'Out of Stock';
                                else if (stock <= threshold) status = 'Low Stock';

                                return (
                                <tr key={product.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img src={product.image} alt={product.name} className="rounded" style={{width: '40px', height: '40px', objectFit: 'cover'}} />
                                            <div className="ms-3">
                                                <h6 className="mb-0 text-truncate" style={{maxWidth: '200px'}}>{product.name}</h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span className="text-muted">SKU-{1000 + idx}</span></td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="fw-bold">{stock}</span>
                                        </div>
                                    </td>
                                    <td>{threshold}</td>
                                    <td><StatusBadge status={status} /></td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-primary">Update Stock</button>
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Inventory;
