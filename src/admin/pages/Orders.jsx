import React, { useEffect, useState } from 'react';
import StatusBadge from '../components/StatusBadge';
import { getAllOrders, updateOrderStatus } from '../../services/api';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const data = await getAllOrders(token);
            setOrders(data || []);
        } catch (error) {
            console.error("Error fetching admin orders", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            await updateOrderStatus(orderId, newStatus, token);
            // Update local state
            setOrders(orders.map(o => o._id === orderId ? { ...o, orderStatus: newStatus } : o));
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Failed to update status: " + error.message);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h3 mb-0">Orders</h2>
                <button className="btn btn-primary">
                    <i className="bi bi-download me-2"></i>Export
                </button>
            </div>
            
            <div className="card shadow-sm border-0">
                <div className="card-header bg-white py-3 d-flex flex-wrap gap-3 align-items-center">
                    <div className="input-group" style={{maxWidth: '300px'}}>
                        <span className="input-group-text bg-white"><i className="bi bi-search"></i></span>
                        <input type="text" className="form-control border-start-0 ps-0" placeholder="Search orders..." />
                    </div>
                    <select className="form-select w-auto">
                        <option>Status: All</option>
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                    </select>
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
                            {loading ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-4">Loading orders...</td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-4">No orders found</td>
                                </tr>
                            ) : (
                                orders.map(order => (
                                    <tr key={order._id}>
                                        <td><span className="fw-bold text-primary">#{order._id.substring(order._id.length - 6)}</span></td>
                                        <td>{order.customerName || order.user?.name || 'Guest'}</td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>{order.items?.reduce((a, b) => a + b.quantity, 0) || 0}</td>
                                        <td>₹{order.total}</td>
                                        <td><span className={`badge ${order.paymentStatus === 'Paid' ? 'bg-success' : 'bg-warning'}`}>{order.paymentStatus}</span></td>
                                        <td>
                                            <select 
                                                className="form-select form-select-sm" 
                                                value={order.orderStatus}
                                                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-light"><i className="bi bi-eye"></i></button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
