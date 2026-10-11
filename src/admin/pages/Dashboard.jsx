import React from 'react';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { mockStats, mockOrders } from '../data/mockAdminData';

const Dashboard = () => {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h3 mb-0">Dashboard</h2>
            </div>
            
            <div className="row g-4 mb-4">
                <div className="col-12 col-md-6 col-lg-3">
                    <StatCard title="Total Sales" value={`$${mockStats.totalSales.toLocaleString()}`} icon="bi-currency-dollar" color="success" trend={12.5} />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <StatCard title="Total Orders" value={mockStats.totalOrders} icon="bi-cart" color="primary" trend={5.2} />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <StatCard title="Total Customers" value={mockStats.totalCustomers} icon="bi-people" color="info" trend={8.1} />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <StatCard title="Pending Orders" value={mockStats.pendingOrders} icon="bi-clock-history" color="warning" trend={-2.4} />
                </div>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-12 col-xl-8">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-header bg-white py-3 border-bottom-0">
                            <h5 className="mb-0">Sales Overview</h5>
                        </div>
                        <div className="card-body d-flex justify-content-center align-items-center bg-light rounded m-3" style={{minHeight: '300px'}}>
                            <p className="text-muted"><i className="bi bi-bar-chart-fill me-2"></i>[Chart placeholder - lightweight implementation]</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-xl-4">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-header bg-white py-3 border-bottom-0">
                            <h5 className="mb-0">Inventory Alerts</h5>
                        </div>
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-3">
                                <div className="icon-shape icon-md bg-light-danger text-danger rounded-3 me-3">
                                    <i className="bi bi-exclamation-triangle"></i>
                                </div>
                                <div>
                                    <h6 className="mb-0">{mockStats.lowStockProducts} Products</h6>
                                    <span className="text-muted small">Low stock or out of stock</span>
                                </div>
                                <div className="ms-auto">
                                    <button className="btn btn-sm btn-outline-danger">View</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm border-0 mb-4">
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Recent Orders</h5>
                    <button className="btn btn-sm btn-light">View All</button>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Items</th>
                                <th>Amount</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockOrders.map(order => (
                                <tr key={order.id}>
                                    <td><span className="fw-bold text-primary">{order.id}</span></td>
                                    <td>{order.customer}</td>
                                    <td>{order.date}</td>
                                    <td>{order.items}</td>
                                    <td>${order.amount.toFixed(2)}</td>
                                    <td>{order.payment}</td>
                                    <td><StatusBadge status={order.status} /></td>
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

export default Dashboard;
