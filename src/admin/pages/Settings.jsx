import React from 'react';

const Settings = () => {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h3 mb-0">Settings</h2>
                <button className="btn btn-primary">
                    <i className="bi bi-save me-2"></i>Save Changes
                </button>
            </div>
            
            <div className="row g-4">
                <div className="col-12 col-xl-3">
                    <div className="list-group shadow-sm border-0">
                        <a href="#store" className="list-group-item list-group-item-action active" data-bs-toggle="list">Store Information</a>
                        <a href="#payment" className="list-group-item list-group-item-action" data-bs-toggle="list">Payment Settings</a>
                        <a href="#delivery" className="list-group-item list-group-item-action" data-bs-toggle="list">Delivery & Shipping</a>
                        <a href="#notifications" className="list-group-item list-group-item-action" data-bs-toggle="list">Notifications</a>
                        <a href="#social" className="list-group-item list-group-item-action" data-bs-toggle="list">Social Links</a>
                    </div>
                </div>
                <div className="col-12 col-xl-9">
                    <div className="tab-content">
                        {/* Store Information Tab */}
                        <div className="tab-pane fade show active" id="store">
                            <div className="card shadow-sm border-0">
                                <div className="card-header bg-white py-3">
                                    <h5 className="mb-0">Store Information</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Store Name</label>
                                            <input type="text" className="form-control" defaultValue="TEMP GROCERY" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Contact Email</label>
                                            <input type="email" className="form-control" defaultValue="support@tempgrocery.com" />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">Store Description / Tagline</label>
                                            <textarea className="form-control" rows="2" defaultValue="Fresh Groceries. Delivered Fast."></textarea>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">Store Address</label>
                                            <textarea className="form-control" rows="3" defaultValue="123 Grocery St., Fresh City, FL 12345"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Settings Tab */}
                        <div className="tab-pane fade" id="payment">
                            <div className="card shadow-sm border-0">
                                <div className="card-header bg-white py-3">
                                    <h5 className="mb-0">Payment Gateways</h5>
                                </div>
                                <div className="card-body">
                                    <div className="alert alert-info">
                                        <i className="bi bi-info-circle me-2"></i>
                                        These are mock frontend configurations. No real API keys should be stored here.
                                    </div>
                                    <div className="mb-4">
                                        <div className="form-check form-switch mb-3">
                                            <input className="form-check-input" type="checkbox" role="switch" id="razorpaySwitch" defaultChecked />
                                            <label className="form-check-label fw-bold" htmlFor="razorpaySwitch">Enable Razorpay</label>
                                        </div>
                                        <div className="row g-3 ms-4">
                                            <div className="col-12">
                                                <label className="form-label text-muted">Razorpay Key ID</label>
                                                <input type="password" className="form-control" placeholder="rzp_test_..." />
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="mt-4">
                                        <div className="form-check form-switch mb-3">
                                            <input className="form-check-input" type="checkbox" role="switch" id="codSwitch" defaultChecked />
                                            <label className="form-check-label fw-bold" htmlFor="codSwitch">Enable Cash on Delivery</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Other tabs follow similar structure... */}
                        <div className="tab-pane fade" id="delivery">
                            <div className="card shadow-sm border-0">
                                <div className="card-header bg-white py-3">
                                    <h5 className="mb-0">Delivery & Shipping</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Base Delivery Fee (₹)</label>
                                            <input type="number" className="form-control" defaultValue="50" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Free Delivery Threshold (₹)</label>
                                            <input type="number" className="form-control" defaultValue="499" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="notifications">
                            <div className="card shadow-sm border-0">
                                <div className="card-header bg-white py-3">
                                    <h5 className="mb-0">Email Notifications</h5>
                                </div>
                                <div className="card-body">
                                    <div className="form-check form-switch mb-3">
                                        <input className="form-check-input" type="checkbox" role="switch" defaultChecked />
                                        <label className="form-check-label">New Order Notifications</label>
                                    </div>
                                    <div className="form-check form-switch mb-3">
                                        <input className="form-check-input" type="checkbox" role="switch" defaultChecked />
                                        <label className="form-check-label">Low Stock Alerts</label>
                                    </div>
                                    <div className="form-check form-switch mb-3">
                                        <input className="form-check-input" type="checkbox" role="switch" />
                                        <label className="form-check-label">Daily Sales Report</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="tab-pane fade" id="social">
                            <div className="card shadow-sm border-0">
                                <div className="card-header bg-white py-3">
                                    <h5 className="mb-0">Social Links</h5>
                                </div>
                                <div className="card-body">
                                    <div className="mb-3 input-group">
                                        <span className="input-group-text bg-light"><i className="bi bi-facebook text-primary"></i></span>
                                        <input type="text" className="form-control" placeholder="Facebook URL" />
                                    </div>
                                    <div className="mb-3 input-group">
                                        <span className="input-group-text bg-light"><i className="bi bi-twitter text-info"></i></span>
                                        <input type="text" className="form-control" placeholder="Twitter URL" />
                                    </div>
                                    <div className="mb-3 input-group">
                                        <span className="input-group-text bg-light"><i className="bi bi-instagram text-danger"></i></span>
                                        <input type="text" className="form-control" placeholder="Instagram URL" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
