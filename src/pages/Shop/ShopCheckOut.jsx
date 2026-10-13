import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MagnifyingGlass } from 'react-loader-spinner'
import ScrollToTop from "../ScrollToTop";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { createPaymentOrder, verifyPayment } from "../../services/api";

const ShopCheckOut = () => {
   const [loaderStatus, setLoaderStatus] = useState(false);
   const [paymentProcessing, setPaymentProcessing] = useState(false);
   const [paymentError, setPaymentError] = useState("");
   const { cart, clearCart } = useCart();
   const { user } = useAuth();
   const navigate = useNavigate();

   const [address, setAddress] = useState({
       street: '123 Main St',
       city: 'Tech City',
       state: 'Innovation State',
       zipCode: '100001',
       country: 'India'
   });

   useEffect(() => {
     setLoaderStatus(false);
   }, []);

   const loadRazorpayScript = () => {
       return new Promise((resolve) => {
           const script = document.createElement("script");
           script.src = "https://checkout.razorpay.com/v1/checkout.js";
           script.onload = () => {
               resolve(true);
           };
           script.onerror = () => {
               resolve(false);
           };
           document.body.appendChild(script);
       });
   };

   const handlePlaceOrder = async (e) => {
       e.preventDefault();
       setPaymentError("");
       
       if (cart.length === 0) {
           setPaymentError("Your cart is empty");
           return;
       }

       setPaymentProcessing(true);

       try {
           const res = await loadRazorpayScript();
           if (!res) {
               setPaymentError("Razorpay SDK failed to load. Are you online?");
               setPaymentProcessing(false);
               return;
           }

           const token = localStorage.getItem('token');
           
           // Format cart for backend
           const orderData = {
               items: cart.map(item => ({
                   productId: item.productId || item._id, // Handle potential id mismatches
                   quantity: item.quantity
               })),
               address: address
           };

           // 1. Create order on backend (Backend calculates final amount)
           const paymentOrder = await createPaymentOrder(orderData, token);
           const { razorpayOrderId, amount, currency, key, calculated } = paymentOrder;

           // 2. Initialize Razorpay Checkout
           const options = {
               key: key, 
               amount: amount, 
               currency: currency,
               name: "FreshCart Grocery",
               description: "Payment for Order",
               order_id: razorpayOrderId,
               handler: async function (response) {
                   try {
                       // 3. Verify payment signature on backend
                       const verifyData = {
                           razorpay_order_id: response.razorpay_order_id,
                           razorpay_payment_id: response.razorpay_payment_id,
                           razorpay_signature: response.razorpay_signature,
                           orderData: {
                               items: calculated.verifiedItems,
                               address,
                               subtotal: calculated.subtotal,
                               discount: calculated.discount,
                               deliveryFee: calculated.deliveryFee,
                               tax: calculated.tax,
                               total: calculated.total
                           }
                       };

                       const verificationResult = await verifyPayment(verifyData, token);
                       
                       if (verificationResult) {
                           // Payment verified, order created
                           clearCart();
                           navigate(`/order-success/${verificationResult._id}`);
                       }
                   } catch (err) {
                       console.error(err);
                       setPaymentError("Payment verification failed. Please contact support.");
                       setPaymentProcessing(false);
                   }
               },
               prefill: {
                   name: user?.name,
                   email: user?.email,
                   contact: user?.phone || '9999999999'
               },
               theme: {
                   color: "#0aad0a"
               }
           };

           const paymentObject = new window.Razorpay(options);
           
           paymentObject.on('payment.failed', function (response){
               console.error("Payment Failed", response.error);
               setPaymentError(response.error.description || "Payment failed");
               setPaymentProcessing(false);
           });

           paymentObject.open();

       } catch (error) {
           console.error("Checkout Error:", error);
           setPaymentError(error.message || "Failed to initiate payment");
           setPaymentProcessing(false);
       }
   };
 
  return (
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
        <>
          <ScrollToTop/>
          <section className="mb-lg-14 mb-8 mt-8">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="mb-8">
                    <h1 className="fw-bold mb-0">Checkout</h1>
                    {!user && (
                        <p className="mb-0 text-danger mt-2">
                        You must <Link to="/MyAccountSignIn">Sign in</Link> to checkout.
                        </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-7 col-md-12">
                  <div className="accordion accordion-flush" id="accordionFlushExample">
                    
                    {/* Simplified Address Step */}
                    <div className="accordion-item py-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fs-5 text-inherit h4 mb-0">
                          <i className="feather-icon icon-map-pin me-2 text-muted" />
                          Delivery Address
                        </span>
                      </div>
                      <div className="mt-4">
                         <div className="border p-4 rounded-3 bg-light">
                             <h6>{user?.name || 'Guest'}</h6>
                             <div className="row g-3 mt-2">
                                 <div className="col-12">
                                     <input type="text" className="form-control" placeholder="Street Address" value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} />
                                 </div>
                                 <div className="col-12 col-sm-6">
                                     <input type="text" className="form-control" placeholder="City" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} />
                                 </div>
                                 <div className="col-12 col-sm-6">
                                     <input type="text" className="form-control" placeholder="State" value={address.state} onChange={(e) => setAddress({...address, state: e.target.value})} />
                                 </div>
                                 <div className="col-12 col-sm-6">
                                     <input type="text" className="form-control" placeholder="Country" value={address.country} onChange={(e) => setAddress({...address, country: e.target.value})} />
                                 </div>
                                 <div className="col-12 col-sm-6">
                                     <input type="text" className="form-control" placeholder="Zip Code" value={address.zipCode} onChange={(e) => setAddress({...address, zipCode: e.target.value})} />
                                 </div>
                             </div>
                         </div>
                      </div>
                    </div>

                    {/* Simplified Payment Action */}
                    <div className="mt-5 p-4 border rounded-3">
                        <h4 className="mb-3">Payment Method</h4>
                        <div className="form-check mb-4">
                            <input className="form-check-input" type="radio" name="payment" id="razorpay" defaultChecked />
                            <label className="form-check-label h6" htmlFor="razorpay">
                                Pay via Razorpay (Credit/Debit/UPI)
                            </label>
                        </div>
                        
                        {paymentError && (
                            <div className="alert alert-danger">{paymentError}</div>
                        )}

                        <div className="d-flex justify-content-end mt-4">
                            <button 
                                className="btn btn-primary w-100 py-3 fw-bold" 
                                onClick={handlePlaceOrder}
                                disabled={paymentProcessing || cart.length === 0 || !user}
                            >
                                {paymentProcessing ? 'Processing...' : 'Place Order & Pay'}
                            </button>
                        </div>
                    </div>

                  </div>
                </div>
                
                {/* Order Summary (Static preview, backend calculates real final) */}
                <div className="col-12 col-md-12 offset-lg-1 col-lg-4">
                  <div className="mt-4 mt-lg-0">
                    <div className="card shadow-sm">
                      <h5 className="px-6 py-4 bg-transparent mb-0">
                        Order Details (Preview)
                      </h5>
                      <ul className="list-group list-group-flush">
                        {cart.length === 0 ? (
                          <li className="list-group-item px-4 py-5 text-center">
                            Your cart is empty.
                          </li>
                        ) : (
                          cart.map((item, index) => (
                            <li key={index} className="list-group-item px-4 py-3">
                              <div className="row align-items-center">
                                <div className="col-3 col-md-3">
                                  <img src={item.image} alt={item.name} className="img-fluid" />
                                </div>
                                <div className="col-6 col-md-6">
                                  <h6 className="mb-0">{item.name}</h6>
                                  <span className="text-muted small">Qty: {item.quantity}</span>
                                </div>
                                <div className="col-3 text-end col-md-3 fw-bold">
                                  ₹{(item.price * item.quantity).toFixed(2)}
                                </div>
                              </div>
                            </li>
                          ))
                        )}
                        <li className="list-group-item px-4 py-3 bg-light">
                            <small className="text-muted d-block text-center">
                                * Final amount including tax and delivery fee will be calculated securely before payment.
                            </small>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default ShopCheckOut;
