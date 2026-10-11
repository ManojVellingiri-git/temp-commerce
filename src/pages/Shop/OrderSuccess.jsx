import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getOrders } from '../../services/api';

const OrderSuccess = () => {
    const { orderId } = useParams();
    const { user } = useAuth();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                // Since getOrders returns all orders for the user, we find the specific one
                // Or we can just show a generic success if we don't want to fetch
                const token = localStorage.getItem('token');
                const response = await getOrders(token);
                const found = response.data.find(o => o._id === orderId);
                setOrder(found);
            } catch (error) {
                console.error("Error fetching order details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [orderId]);

    return (
        <section className="py-14">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-12 text-center">
                        <div className="mb-8">
                            <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '5rem' }}></i>
                        </div>
                        <h2 className="mb-3">Order Placed Successfully!</h2>
                        <p className="text-muted mb-4">
                            Thank you for shopping with us, {user?.name}. Your order has been confirmed.
                        </p>
                        
                        {loading ? (
                             <div className="spinner-border text-primary" role="status"></div>
                        ) : order ? (
                            <div className="card border-0 bg-light mb-5 text-start shadow-sm">
                                <div className="card-body p-5">
                                    <h5 className="mb-3">Order Summary</h5>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="text-muted">Order ID:</span>
                                        <span className="fw-bold">{order._id}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="text-muted">Payment Status:</span>
                                        <span className="badge bg-success">{order.paymentStatus}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="text-muted">Total Amount:</span>
                                        <span className="fw-bold">₹{order.total}</span>
                                    </div>
                                    <hr />
                                    <h6 className="mb-2">Delivery Address</h6>
                                    <p className="mb-0 text-muted small">
                                        {order.shippingAddress?.street}, {order.shippingAddress?.city},<br/>
                                        {order.shippingAddress?.state}, {order.shippingAddress?.zipCode}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="alert alert-info">Order ID: {orderId}</div>
                        )}

                        <div className="d-flex justify-content-center gap-3">
                            <Link to="/MyAccountOrder" className="btn btn-primary">
                                View My Orders
                            </Link>
                            <Link to="/Grocery-react/" className="btn btn-outline-primary">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderSuccess;
