import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MagnifyingGlass } from "react-loader-spinner";
import ScrollToTop from "../ScrollToTop";
import { getOrders } from "../../services/api";

const MyAccountOrder = () => {
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const res = await getOrders(token);
                setOrders(res.data || []);
            }
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setLoaderStatus(false);
        }
    };
    fetchOrders();
  }, []);

  return (
    <div>
       <ScrollToTop/>
       <section>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="p-6 d-flex justify-content-between align-items-center d-md-none">
                  <h3 className="fs-5 mb-0">Account Setting</h3>
                  <button
                    className="btn btn-outline-gray-400 text-muted d-md-none"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasAccount"
                    aria-controls="offcanvasAccount"
                  >
                    <i className="fas fa-bars"></i>
                  </button>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-12 border-end d-none d-md-block">
                <div className="pt-10 pe-lg-10">
                  <ul className="nav flex-column nav-pills nav-pills-dark">
                    <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" to="/MyAccountOrder">
                        <i className="fas fa-shopping-bag me-2" /> Your Orders
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/MyAccountSetting">
                        <i className="fas fa-cog me-2" /> Settings
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/MyAccountAddress">
                        <i className="fas fa-map-marker-alt me-2" /> Address
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/MyAcconutPaymentMethod">
                        <i className="fas fa-credit-card me-2" /> Payment Method
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/MyAcconutNotification">
                        <i className="fas fa-bell me-2" /> Notification
                      </Link>
                    </li>
                    <li className="nav-item"><hr /></li>
                    <li className="nav-item">
                      <Link className="nav-link " to="/">
                        <i className="fas fa-sign-out-alt me-2" /> Log out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-9 col-md-8 col-12">
                <div>
                  {loaderStatus ? (
                    <div className="loader-container">
                      <MagnifyingGlass
                        visible={true}
                        height="100"
                        width="100"
                        ariaLabel="magnifying-glass-loading"
                        glassColor="#c0efff"
                        color="#0aad0a"
                      />
                    </div>
                  ) : (
                    <div className="p-6 p-lg-10">
                      <h2 className="mb-6">Your Orders</h2>
                      <div className="table-responsive border-0">
                        <table className="table mb-0 text-nowrap">
                          <thead className="table-light">
                            <tr>
                              <th className="border-0">Order ID</th>
                              <th className="border-0">Date</th>
                              <th className="border-0">Items</th>
                              <th className="border-0">Payment</th>
                              <th className="border-0">Status</th>
                              <th className="border-0">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-5">
                                        No orders found.
                                    </td>
                                </tr>
                            ) : (
                                orders.map(order => (
                                    <tr key={order._id}>
                                        <td className="align-middle border-top-0">
                                            <Link to={`/order-success/${order._id}`} className="text-inherit">
                                                #{order._id.substring(order._id.length - 6)}
                                            </Link>
                                        </td>
                                        <td className="align-middle border-top-0">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="align-middle border-top-0">
                                            {order.items.reduce((acc, item) => acc + item.quantity, 0)}
                                        </td>
                                        <td className="align-middle border-top-0">
                                            <span className={`badge ${order.paymentStatus === 'Paid' ? 'bg-success' : 'bg-warning'}`}>
                                                {order.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="align-middle border-top-0">
                                            <span className={`badge ${order.orderStatus === 'Delivered' ? 'bg-success' : 'bg-primary'}`}>
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                        <td className="align-middle border-top-0">
                                            ₹{order.total}
                                        </td>
                                    </tr>
                                ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
};

export default MyAccountOrder;
