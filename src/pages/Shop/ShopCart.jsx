import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import productimage1 from '../../images/product-img-1.jpg'
import productimage2 from '../../images/product-img-2.jpg'
import productimage3 from '../../images/product-img-3.jpg'
import productimage4 from '../../images/product-img-4.jpg'
import productimage5 from '../../images/product-img-5.jpg'
import { MagnifyingGlass } from "react-loader-spinner";
import ScrollToTop from "../ScrollToTop";

import { brandConfig } from "../../config/brandConfig";
import { useCart } from "../../context/CartContext";

const ShopCart = () => {
   const navigate = useNavigate();

   // loading
   const [loaderStatus, setLoaderStatus] = useState(false);
   const { cart, removeFromCart, increaseQuantity, decreaseQuantity, setQuantity, calculateSubtotal, calculateDiscount, calculateDeliveryFee, calculateTax, calculateGrandTotal, clearCart } = useCart();
   useEffect(() => {
     setLoaderStatus(false);
   }, []);
 
  return (
    <div>
      <div>
      {loaderStatus ? (
        <div className="loader-container">
          {/* <PulseLoader loading={loaderStatus} size={50} color="#0aad0a" /> */}
          <MagnifyingGlass
  visible={true}
  height="100"
  width="100"
  ariaLabel="magnifying-glass-loading"
  wrapperStyle={{}}
  wrapperclassName="magnifying-glass-wrapper"
  glassColor="#c0efff"
  color="#0aad0a"
  />
        </div>
      ) : (
        <>
         <>
            <ScrollToTop/>
            </>
      <>
        <div>
          {/* section*/}
        
          {/* section */}
          <section className="mb-lg-14 mb-8 mt-8">
            <div className="container">
              {/* row */}
              <div className="row">
                <div className="col-12">
                  {/* card */}
                  <div className="card py-1 border-0 mb-8">
                    <div>
                      <h1 className="fw-bold">Shop Cart</h1>
                      <p className="mb-0">Shopping in 382480</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* row */}
              <div className="row">
                <div className="col-lg-8 col-md-7">
                  <div className="py-3">
                    {/* alert */}
                    {calculateSubtotal() >= brandConfig.shipping.freeDeliveryThreshold ? (
                      <div className="alert alert-success p-2" role="alert">
                        You’ve got FREE delivery. Start <Link to="/ShopCheckOut" className="alert-link">checkout now!</Link>
                      </div>
                    ) : (
                      <div className="alert alert-danger p-2" role="alert">
                        Add ₹{brandConfig.shipping.freeDeliveryThreshold - calculateSubtotal()} more to get FREE delivery.
                      </div>
                    )}
                    <ul className="list-group list-group-flush">
                      {cart.length === 0 ? (
                        <li className="list-group-item py-5 px-0 text-center border-top">
                          <h6 className="mb-3">Your cart is empty</h6>
                          <p className="text-muted small mb-4">Add some fresh groceries to get started.</p>
                          <Link to="/Shop" className="btn btn-primary">Continue Shopping</Link>
                        </li>
                      ) : (
                        cart.map((item, index) => (
                          <li key={item.productId} className={`list-group-item py-3 py-lg-0 px-0 ${index === 0 ? 'border-top' : ''}`}>
                            <div className="row align-items-center g-2">
                              {/* Product Image */}
                              <div className="col-3 col-sm-2">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="img-fluid rounded"
                                />
                              </div>
                              {/* Product Info */}
                              <div className="col-9 col-sm-4 col-md-5">
                                <h6 className="mb-0">{item.name}</h6>
                                <span>
                                  <small className="text-muted">{item.unit}</small>
                                </span>
                                <div className="mt-1 small">
                                  <Link
                                    to="#!"
                                    className="text-decoration-none text-danger"
                                    onClick={() => removeFromCart(item.productId)}
                                  >
                                    <span className="me-1 align-text-bottom">
                                      <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        <line x1={10} y1={11} x2={10} y2={17} />
                                        <line x1={14} y1={11} x2={14} y2={17} />
                                      </svg>
                                    </span>
                                    <span>Remove</span>
                                  </Link>
                                </div>
                              </div>
                              {/* Desktop Quantity & Price */}
                              <div className="col-sm-3 col-lg-2 d-none d-sm-block">
                                <div className="input-group input-group-sm flex-nowrap justify-content-center">
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary px-2"
                                    onClick={() => decreaseQuantity(item.productId)}
                                  >
                                    -
                                  </button>
                                  <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => setQuantity(item.productId, parseInt(e.target.value) || 1)}
                                    className="form-control text-center px-1"
                                    style={{ width: "45px" }}
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary px-2"
                                    onClick={() => increaseQuantity(item.productId)}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <div className="col-sm-3 col-md-3 col-lg-3 text-end d-none d-sm-block">
                                <span className="fw-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                              {/* Mobile-only Controls & Price Stacked Row */}
                              <div className="col-12 d-flex d-sm-none justify-content-between align-items-center mt-2 pt-2 border-top">
                                <div className="input-group input-group-sm w-auto">
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary px-2 py-1"
                                    onClick={() => decreaseQuantity(item.productId)}
                                  >
                                    -
                                  </button>
                                  <span className="form-control form-control-sm text-center px-2 py-1 bg-white" style={{ minWidth: "36px" }}>
                                    {item.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary px-2 py-1"
                                    onClick={() => increaseQuantity(item.productId)}
                                  >
                                    +
                                  </button>
                                </div>
                                <div className="text-end">
                                  <span className="fw-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))
                      )}
                    </ul>
                    {/* btn */}
                    <div className="d-flex justify-content-between mt-4">
                      <Link to="/Shop" className="btn btn-primary">
                        Continue Shopping
                      </Link>
                      {cart.length > 0 && (
                        <button className="btn btn-dark" onClick={clearCart}>
                          Clear Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {/* sidebar */}
                <div className="col-12 col-lg-4 col-md-5">
                  {/* card */}
                  <div className="mb-5 card mt-6">
                    <div className="card-body p-6">
                      {/* heading */}
                      <h2 className="h5 mb-4">Summary</h2>
                      <div className="card mb-2">
                        {/* list group */}
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="me-auto">
                              <div>Item Subtotal</div>
                            </div>
                            <span>₹{calculateSubtotal().toFixed(2)}</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="me-auto">
                              <div>Delivery Fee</div>
                            </div>
                            <span>₹{calculateDeliveryFee().toFixed(2)}</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="me-auto">
                              <div>Tax (5%)</div>
                            </div>
                            <span>₹{calculateTax().toFixed(2)}</span>
                          </li>

                          <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="me-auto">
                              <div className="fw-bold">Grand Total</div>
                            </div>
                            <span className="fw-bold">₹{calculateGrandTotal().toFixed(2)}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="d-grid mb-1 mt-4">
                        {/* btn */}
                        <button
                          className="btn btn-primary btn-lg d-flex justify-content-between align-items-center"
                          disabled={cart.length === 0}
                          type="button"
                          onClick={() => navigate('/ShopCheckOut')}
                        >
                          Go to Checkout <span className="fw-bold">₹{calculateGrandTotal().toFixed(2)}</span>
                        </button>
                      </div>
                      {/* text */}
                      <p>
                        <small>
                          By placing your order, you agree to be bound by the
                          {brandConfig.name} <Link to
                          ="#!">Terms of Service</Link>
                          and <Link to
                          ="#!">Privacy Policy.</Link>{" "}
                        </small>
                      </p>
                      {/* heading */}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    </>
    )}
  </div>
    </div>
  );
};

export default ShopCart;
