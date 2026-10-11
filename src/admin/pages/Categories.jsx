import React, { useState } from 'react';
import StatusBadge from '../components/StatusBadge';
import { categories as initialCategories } from '../../data/categories';

const Categories = () => {
    const [categories, setCategories] = useState(initialCategories);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h3 mb-0">Categories</h2>
                <button className="btn btn-primary">
                    <i className="bi bi-plus-lg me-2"></i>Add Category
                </button>
            </div>
            
            <div className="card shadow-sm border-0">
                <div className="card-header bg-white py-3 d-flex align-items-center gap-3">
                    <div className="input-group" style={{maxWidth: '300px'}}>
                        <span className="input-group-text bg-white"><i className="bi bi-search"></i></span>
                        <input type="text" className="form-control border-start-0 ps-0" placeholder="Search categories..." />
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Category</th>
                                <th>Slug</th>
                                <th>Products</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(category => (
                                <tr key={category.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="icon-shape icon-md bg-light-primary text-primary rounded-3">
                                                <i className={`bi ${category.icon} fs-4`}></i>
                                            </div>
                                            <div className="ms-3">
                                                <h6 className="mb-0">{category.name}</h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span className="text-muted">{category.slug}</span></td>
                                    <td>{Math.floor(Math.random() * 50) + 10}</td>
                                    <td><StatusBadge status="Active" /></td>
                                    <td>
                                        <div className="btn-group">
                                            <button className="btn btn-sm btn-light text-primary" title="Edit">
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button className="btn btn-sm btn-light text-danger" title="Delete">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Categories;
