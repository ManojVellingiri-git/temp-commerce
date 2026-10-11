import React from 'react';
import StatusBadge from '../components/StatusBadge';
import { mockCoupons } from '../data/mockAdminData';

const Coupons = () => {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h3 mb-0">Coupons</h2>
                <button className="btn btn-primary">
                    <i className="bi bi-plus-lg me-2"></i>Create Coupon
                </button>
            </div>
            
            <div className="card shadow-sm border-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Code</th>
                                <th>Type</th>
                                <th>Discount</th>
                                <th>Min. Order</th>
                                <th>Validity</th>
                                <th>Usage</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockCoupons.map(coupon => (
                                <tr key={coupon.id}>
                                    <td><span className="badge bg-light text-dark border fw-bold px-2 py-1 fs-6">{coupon.code}</span></td>
                                    <td>{coupon.type}</td>
                                    <td>{coupon.type === 'Percentage' ? `${coupon.amount}%` : `$${coupon.amount}`}</td>
                                    <td>${coupon.minOrder}</td>
                                    <td>
                                        <div className="small">
                                            <div>Start: {coupon.startDate}</div>
                                            <div className="text-muted">End: {coupon.endDate}</div>
                                        </div>
                                    </td>
                                    <td>{Math.floor(Math.random() * 200)} / {coupon.usageLimit}</td>
                                    <td><StatusBadge status={coupon.status} /></td>
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

export default Coupons;
