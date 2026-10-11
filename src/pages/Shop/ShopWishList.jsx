import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import Swal from "sweetalert2";
import '@fortawesome/fontawesome-free/css/all.min.css';
import productimage15 from '../../images/product-img-15.jpg'
import productimage16 from '../../images/product-img-16.jpg'
import productimage17 from '../../images/product-img-17.jpg'
import productimage18 from '../../images/product-img-18.jpg'
import productimage19 from '../../images/product-img-19.jpg'
import { MagnifyingGlass } from 'react-loader-spinner'
import ScrollToTop from "../ScrollToTop";

const ShopWishList = () => {


   // loading
   const [loaderStatus, setLoaderStatus] = useState(false);
   const { wishlist, removeFromWishlist } = useWishlist();
   const { addToCart } = useCart();
   
   const handleAddToCart = (item) => {
     addToCart(item);
     Swal.fire({
       icon: 'success',
       title: 'Added to Cart',
       text: `${item.name} has been added to your cart!`,
       showConfirmButton: false,
       timer: 1500,
     });
   };
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
        {/* section */}
        <section className="my-14">
          <div className="container">
            {/* row */}
            <div className="row">
              <div className="offset-lg-1 col-lg-10">
                <div className="mb-8">
                  {/* heading */}
                  <h1 className="mb-1">My Wishlist</h1>
                  <p>There are {wishlist.length} products in this wishlist.</p>
                </div>
                <div>
                  {/* table */}
                  <div className="table-responsive">
                    <table className="table text-nowrap">
                      <thead className="table-light">
                        <tr>
                          <th>
                            {/* form check */}
                            <div className="form-check">
                              {/* input */}
                              <input
                                className="form-check-input"
                                type="checkbox"
                                defaultValue
                                id="chechboxOne"
                              />
                              {/* label */}
                              <label
                                className="form-check-label"
                                htmlFor="chechboxOne"
                              ></label>
                            </div>
                          </th>
                          <th />
                          <th>Product</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Actions</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {wishlist.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="text-center py-5">
                              <h5 className="mb-2">Your wishlist is empty</h5>
                              <Link to="/Shop" className="btn btn-primary mt-2">Explore Products</Link>
                            </td>
                          </tr>
                        ) : (
                          wishlist.map(item => (
                            <tr key={item.productId}>
                              <td className="align-middle">
                                <div className="form-check">
                                  <input className="form-check-input" type="checkbox" id={`checkbox-${item.productId}`} />
                                  <label className="form-check-label" htmlFor={`checkbox-${item.productId}`}></label>
                                </div>
                              </td>
                              <td className="align-middle">
                                <Link to="#">
                                  <img
                                    src={item.image}
                                    className="img-fluid icon-shape icon-xxl"
                                    alt={item.name}
                                  />
                                </Link>
                              </td>
                              <td className="align-middle">
                                <div>
                                  <h5 className="fs-6 mb-0">
                                    <Link to="#" className="text-inherit">
                                      {item.name}
                                    </Link>
                                  </h5>
                                  <small>{item.price}</small>
                                </div>
                              </td>
                              <td className="align-middle">$\{item.price}</td>
                              <td className="align-middle">
                                <span className="badge bg-success">In Stock</span>
                              </td>
                              <td className="align-middle">
                                <button className="btn btn-primary btn-sm" onClick={() => handleAddToCart(item)}>
                                  Add to Cart
                                </button>
                              </td>
                              <td className="align-middle text-center">
                                <Link
                                  to="#!"
                                  className="text-muted"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Delete"
                                  onClick={(e) => { e.preventDefault(); removeFromWishlist(item.productId); }}
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </Link>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
      </>
    )}
  </div>
    </div>
  );
};
export default ShopWishList;
