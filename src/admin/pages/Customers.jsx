import React from 'react';
import StatusBadge from '../components/StatusBadge';
import { mockCustomers } from '../data/mockAdminData';

const Customers = () => {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h3 mb-0">Customers</h2>
                <button className="btn btn-primary">
                    <i className="bi bi-download me-2"></i>Export
                </button>
            </div>
            
            <div className="card shadow-sm border-0">
                <div className="card-header bg-white py-3 d-flex flex-wrap gap-3 align-items-center">
                    <div className="input-group" style={{maxWidth: '300px'}}>
                        <span className="input-group-text bg-white"><i className="bi bi-search"></i></span>
                        <input type="text" className="form-control border-start-0 ps-0" placeholder="Search customers..." />
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Orders</th>
                                <th>Total Spent</th>
                                <th>Last Order</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockCustomers.map(customer => (
                                <tr key={customer.id}>
                                    <td><span className="text-muted">{customer.id}</span></td>
                                    <td className="fw-bold">{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.orders}</td>
                                    <td>${customer.spent.toFixed(2)}</td>
                                    <td>{customer.lastOrder}</td>
                                    <td><StatusBadge status={customer.status} /></td>
                                    <td>
                                        <button className="btn btn-sm btn-light"><i className="bi bi-eye"></i></button>
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

export default Customers;
