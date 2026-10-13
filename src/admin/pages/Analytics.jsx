import React from 'react';
import StatCard from '../components/StatCard';
import { mockStats } from '../data/mockAdminData';

const Analytics = () => {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h3 mb-0">Analytics & Reports</h2>
                <select className="form-select w-auto">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>This Year</option>
                </select>
            </div>
            
            <div className="row g-4 mb-4">
                <div className="col-12 col-md-6 col-lg-3">
                    <StatCard title="Revenue" value={`₹${mockStats.totalSales.toLocaleString()}`} icon="bi-currency-rupee" color="success" trend={12.5} />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <StatCard title="Orders" value={mockStats.totalOrders} icon="bi-cart" color="primary" trend={5.2} />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <StatCard title="Customers" value={mockStats.totalCustomers} icon="bi-people" color="info" trend={8.1} />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <StatCard title="Avg. Order Value" value={`₹${(mockStats.totalSales / mockStats.totalOrders).toFixed(2)}`} icon="bi-bag-check" color="warning" trend={2.4} />
                </div>
            </div>

            <div className="row g-4">
                <div className="col-12 col-lg-8">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-header bg-white py-3">
                            <h5 className="mb-0">Revenue Trend</h5>
                        </div>
                        <div className="card-body d-flex justify-content-center align-items-center bg-light m-3 rounded" style={{minHeight: '350px'}}>
                            <p className="text-muted"><i className="bi bi-graph-up me-2"></i>[Detailed Analytics Chart Placeholder]</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-header bg-white py-3">
                            <h5 className="mb-0">Top Categories</h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                                    Snacks & Munchies
                                    <span className="badge bg-primary rounded-pill">35%</span>
                                </li>
                                <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                                    Bakery & Biscuits
                                    <span className="badge bg-primary rounded-pill">25%</span>
                                </li>
                                <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                                    Cold Drinks & Juices
                                    <span className="badge bg-primary rounded-pill">20%</span>
                                </li>
                                <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                                    Dairy & Breakfast
                                    <span className="badge bg-primary rounded-pill">15%</span>
                                </li>
                                <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                                    Instant Food
                                    <span className="badge bg-primary rounded-pill">5%</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
