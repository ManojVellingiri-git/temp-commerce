import React, { useState } from "react";
import { brandConfig } from '../config/brandConfig';
import menubanner from "../images/menu-banner.jpg";
import productimage1 from '../images/product-img-1.jpg'
import productimage2 from '../images/product-img-2.jpg'
import productimage3 from '../images/product-img-3.jpg'
import productimage4 from '../images/product-img-4.jpg'
import productimage5 from '../images/product-img-5.jpg'
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {


  const [isOpen, setIsOpen] = useState(false);
  const { cart, getCartCount, calculateSubtotal, removeFromCart, increaseQuantity, decreaseQuantity, setQuantity } = useCart();
  const { getWishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };



  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="border-bottom bg-light py-1">
        <div className="container d-flex justify-content-between align-items-center">
          <span className="small text-muted text-truncate">Super Value Deals - Save more with coupons</span>
          <div className="d-none d-lg-flex align-items-center gap-3">
            <Link to="/helpcenter" className="text-muted small text-decoration-none">Help Center</Link>
            <Link to="/Contact" className="text-muted small text-decoration-none">Contact Us</Link>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm py-2">
        <div className="container">
          {/* Brand */}
          <Link className="navbar-brand me-2 me-lg-4" to="/" onClick={() => setIsOpen(false)}>
            <h2 style={{ color: brandConfig.colors.primary, fontWeight: 'bold', margin: 0, padding: 0 }}>
              {brandConfig.name}
            </h2>
          </Link>

          {/* Desktop Search (Visible >= 992px) */}
          <div className="d-none d-lg-block flex-grow-1 mx-3" style={{ maxWidth: '450px' }}>
            <div className="input-group">
              <input
                className="form-control"
                list="datalistOptions"
                id="exampleDataList"
                placeholder="Search for products, categories..."
              />
              <button className="btn btn-outline-secondary" type="button" aria-label="Search">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>

          {/* Action Icons & Toggler (Unified on all viewports, visible mobile, tablet, and desktop) */}
          <div className="d-flex align-items-center ms-auto">
            <div className="list-inline mb-0 d-flex align-items-center gap-2 gap-sm-3 me-2 me-lg-3">
              {/* Wishlist */}
              <div className="list-inline-item m-0">
                <Link to="/ShopWishList" className="text-muted position-relative p-1 d-inline-block" title="Wishlist">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height={22}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-heart"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                    {getWishlistCount()}
                  </span>
                </Link>
              </div>

              {/* User Dropdown */}
              <div className="list-inline-item m-0">
                <div className="dropdown d-inline-block">
                  <button
                    className="btn btn-link text-muted p-1 border-0 dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ textDecoration: 'none' }}
                    aria-label="User account"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height={22}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-user"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx={12} cy={7} r={4} />
                    </svg>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                    {!isAuthenticated ? (
                      <>
                        <li><Link className="dropdown-item" to="/MyAccountSignIn" onClick={() => setIsOpen(false)}>Sign In</Link></li>
                        <li><Link className="dropdown-item" to="/MyAccountSignUp" onClick={() => setIsOpen(false)}>Sign Up</Link></li>
                      </>
                    ) : (
                      <>
                        <li><span className="dropdown-item-text fw-bold">{user?.name}</span></li>
                        {user?.role === 'admin' && (
                          <li><Link className="dropdown-item text-primary" to="/admin/dashboard" onClick={() => setIsOpen(false)}>Admin Dashboard</Link></li>
                        )}
                        <li><Link className="dropdown-item" to="/MyAccountOrder" onClick={() => setIsOpen(false)}>My Orders</Link></li>
                        <li><Link className="dropdown-item" to="/MyAccountSetting" onClick={() => setIsOpen(false)}>Settings</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item text-danger" onClick={() => { handleLogout(); setIsOpen(false); }}>Logout</button></li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              {/* Cart Drawer Trigger */}
              <div className="list-inline-item m-0">
                <Link
                  className="text-muted position-relative p-1 d-inline-block"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  to="#offcanvasExample"
                  role="button"
                  aria-controls="offcanvasRight"
                  title="Cart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height={22}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-shopping-bag"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1={3} y1={6} x2={21} y2={6} />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                    {getCartCount()}
                  </span>
                </Link>
              </div>
            </div>

            {/* Mobile/Tablet Menu Toggler */}
            <button
              className="navbar-toggler border-0 p-1 ms-1"
              type="button"
              onClick={handleClick}
              aria-controls="mobile_nav"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
            >
              <div className={`containerr ${isOpen ? 'change' : ''}`}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
              </div>
            </button>
          </div>

          {/* Mobile/Tablet Search (Full width below brand and actions) */}
          <div className="w-100 d-lg-none mt-2 pt-1">
            <div className="input-group">
              <input
                className="form-control"
                list="datalistOptions"
                placeholder="Search for products, categories..."
                aria-label="Search"
              />
              <button className="btn btn-outline-secondary" type="button" aria-label="Search">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>

          {/* Collapsible Navbar with working state */}
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="mobile_nav">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0 float-md-right"></ul>
        <ul className="navbar-nav navbar-light">
          <li className="nav-item dmenu dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#!"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="me-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-grid"
                  >
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </span>{" "}
                All Departments
              </Link>
              <div
                className="dropdown-menu sm-menu"
                aria-labelledby="navbarDropdown"
              >
                <Link className="dropdown-item" to="/Shop">
                  Dairy, Bread &amp; Eggs
                </Link>
                <Link className="dropdown-item" to="/Shop">
                  Snacks &amp; Munchies
                </Link>
                <Link className="dropdown-item" to="/Shop">
                  Fruits &amp; Vegetables
                </Link>
                <Link className="dropdown-item" to="/Shop">
                  Cold Drinks &amp; Juices
                </Link>
                <Link className="dropdown-item" to="/Shop">
                  Breakfast &amp; Instant Food
                </Link>
                <Link className="dropdown-item" to="/Shop">
                  Bakery &amp; Biscuits
                </Link>
                <Link className="dropdown-item" to="/Shop">
                  Chicken, Meat &amp; Fish
                </Link>
              </div>
            </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item dmenu dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              About
            </Link>
            <div
              className="dropdown-menu sm-menu"
              aria-labelledby="navbarDropdown"
            >
              <Link className="dropdown-item" to="/Blog">
                Blog
              </Link>
              {/* <Link className="dropdown-item" to="pages/blog-single.html">
                    Blog Single
                  </Link> */}
              <Link className="dropdown-item" to="/BlogCategory">
                Blog Category
              </Link>
              <Link className="dropdown-item" to="/AboutUs">
                About us
              </Link>
              {/* <Link className="dropdown-item" to="pages/404error.html">
                    404 Error
                  </Link> */}
              <Link className="dropdown-item" to="/Contact">
                Contact
              </Link>
            </div>
          </li>

          <li className="nav-item dmenu dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Shop
            </Link>
            <div
              className="dropdown-menu sm-menu"
              aria-labelledby="navbarDropdown"
            >
              <Link className="dropdown-item" to="/Shop">
                Shop
              </Link>
              <Link className="dropdown-item" to="/ShopWishList">
                Shop Wishlist
              </Link>
              <Link className="dropdown-item" to="/ShopCart">
                Shop Cart
              </Link>
              <Link className="dropdown-item" to="/ShopCheckOut">
                Shop Checkout
              </Link>
            </div>
          </li>

          {/* <li className="nav-item dmenu dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Pages
                </Link>
                <div
                  className="dropdown-menu sm-menu"
                  aria-labelledby="navbarDropdown"
                >
                  <Link class="dropdown-item" to="pages/blog.html">
                    Blog
                  </Link>
                  <div>
                    <Link className="dropdown-item" to="pages/blog-single.html">
                      Blog Single
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="pages/blog-category.html"
                    >
                      Blog Category
                    </Link>
                    <Link className="dropdown-item" to="pages/about.html">
                      About us
                    </Link>
                    <Link className="dropdown-item" to="pages/404error.html">
                      404 Error
                    </Link>
                    <Link className="dropdown-item" to="pages/contact.html">
                      Contact
                    </Link>
                  </div>
                </div>
              </li> */}

          <li className="nav-item dropdown megamenu-li dmenu">
            <Link
              className="nav-link dropdown-toggle"
              to="/Shop"
              id="dropdown01"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              All Services
            </Link>
            <div
              className="dropdown-menu megamenu sm-menu border-top"
              aria-labelledby="dropdown01"
            >
              <div className="row">
                <div className="col-sm-6 col-lg-3 border-right mb-4">
                  <div>
                    <h6 className="text-primary ps-3">
                      Dairy, Bread &amp; Eggs
                    </h6>
                    <Link className="dropdown-item" to="/Shop">
                      Butter
                    </Link>
                    <Link className="dropdown-item" to="/Shop">
                      Milk Drinks
                    </Link>
                    <Link className="dropdown-item" to="/Shop">
                      Curd &amp; Yogurt
                    </Link>
                    <Link className="dropdown-item" to="/Shop">
                      Eggs
                    </Link>
                    <Link className="dropdown-item" to="/Shop">
                      Buns &amp; Bakery
                    </Link>
                    <Link className="dropdown-item" to="/Shop">
                      Cheese
                    </Link>
                    <Link className="dropdown-item" to="/Shop">
                      Condensed Milk
                    </Link>
                    <Link className="dropdown-item" to="/Shop">
                      Dairy Products
                    </Link>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3 border-right mb-4">
                  <div>
                    <h6 className="text-primary ps-3">
                      Breakfast &amp; Instant Food
                    </h6>
                    <Link className="dropdown-item" to="/Shop">
                      Breakfast Cereal
                    </Link>
                    <Link className="dropdown-item" to="/Shop">
                      {" "}
                      Noodles, Pasta &amp; Soup
                    </Link>
                    <Link className="dropdown-item" to="/Shop">
                      Frozen Veg Snacks
                    </Link>
                    <Link className="dropdown-item" to="/Shop">
                      {" "}
                      Frozen Non-Veg Snacks
                    </Link>
                    <Link className="dropdown-item" to="/Shop">
                      {" "}
                      Vermicelli
                    </Link>
                    <Link className="dropdown-item" to="/Shop">
                      {" "}
                      Instant Mixes
                    </Link>
                    <Link className="dropdown-item" to="/Shop">
                      {" "}
                      Batter
                    </Link>
                    <Link className="dropdown-item" to="/Shop">
                      {" "}
                      Fruit and Juices
                    </Link>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3 mb-4">
                  <div>
                    <h6 className="text-primary ps-3">
                      Cold Drinks &amp; Juices
                    </h6>
                    <Link className="dropdown-item" to="/Shop">
                      Soft Drinks
                    </Link>
                    <Link className="dropdown-item" to="/Shop">
                      Fruit Juices
                    </Link>
                    <Link className="dropdown-item" to="/Shop">
                      Coldpress
                    </Link>
                    <Link className="dropdown-item" to="/Shop">
                      Water &amp; Ice Cubes
                    </Link>
                    <Link className="dropdown-item" to="/Shop">
                      Soda &amp; Mixers
                    </Link>
                    <Link className="dropdown-item" to="/Shop">
                      Health Drinks
                    </Link>
                    <Link className="dropdown-item" to="/Shop">
                      Herbal Drinks
                    </Link>
                    <Link className="dropdown-item" to="/Shop">
                      Milk Drinks
                    </Link>
                  </div>
                </div>

                {/* <div className="row"> */}
                <div className="col-sm-6 col-lg-3 border-right mb-4">
                  <div className="card border-0">
                    <img
                      src={menubanner}
                      style={{ width: "90%" }}
                      alt="eCommerce HTML Template"
                      className="img-fluid rounded-3"
                    />
                    <div className="position-absolute ps-6 mt-8">
                      <h5 className=" mb-0 ">
                        Dont miss this <br />
                        offer today.
                      </h5>
                      <Link
                        to="/Shop"
                        className="btn btn-primary btn-sm mt-3"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </div>
          </li>

          <li className="nav-item dmenu dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="#!"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Account
            </Link>
            <div
              className="dropdown-menu sm-menu"
              aria-labelledby="navbarDropdown"
            >
              <div>
                <div>
                  {!isAuthenticated ? (
                    <>
                      <Link className="dropdown-item" to="/MyAccountSignIn">
                        Sign in
                      </Link>
                      <Link className="dropdown-item" to="/MyAccountSignUp">
                        Signup
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="/MyAccountForgetPassword"
                      >
                        Forgot Password
                      </Link>
                    </>
                  ) : (
                    <>
                      {user?.role === 'admin' && (
                        <Link className="dropdown-item text-primary fw-bold" to="/admin/dashboard">
                          Admin Dashboard
                        </Link>
                      )}
                      <Link className="dropdown-item" to="/MyAccountOrder">
                        Orders
                      </Link>
                      <Link className="dropdown-item" to="/MyAccountSetting">
                        Settings
                      </Link>
                      <Link className="dropdown-item" to="/MyAccountAddress">
                        Address
                      </Link>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </li>
          {/* <li className="nav-item">
                <Link className="nav-link" to="#!">
                  Contact us
                </Link>
              </li> */}
        </ul>
      </div>
      {/* <div className="col-md-2 col-xxl-1 text-end d-none d-lg-block">
            
          </div> */}
    </div>
      </nav >
  <>
    <div>
      {/* Modal */}
      <div
        className="modal fade"
        id="userModal"
        tabIndex={-1}
        aria-labelledby="userModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4">
            <div className="modal-header border-0">
              <h5 className="modal-title fs-3 fw-bold" id="userModalLabel">
                Sign Up
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="Enter Your Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter Email address"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter Password"
                    required
                  />
                  <small className="form-text">
                    By Signup, you agree to our{" "}
                    <Link to="#!">Terms of Service</Link> &amp;{" "}
                    <Link to="#!">Privacy Policy</Link>
                  </small>
                </div>
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </form>
            </div>
            <div className="modal-footer border-0 justify-content-center">
              Already have an account? <Link to="/MyAccountSignIn">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
      {/* Shop Cart */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        style={{ maxWidth: '100vw' }}
      >
        <div className="offcanvas-header border-bottom">
          <div className="text-start">
            <h5 id="offcanvasRightLabel" className="mb-0 fs-4">
              Shop Cart
            </h5>
            <small>Location in 382480</small>
          </div>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          {calculateSubtotal() >= brandConfig.shipping.freeDeliveryThreshold ? (
            <div className="alert alert-success" role="alert">
              You’ve got FREE delivery. Start checkout now!
            </div>
          ) : (
            <div className="alert alert-danger" role="alert">
              Add $\{brandConfig.shipping.freeDeliveryThreshold - calculateSubtotal()} more to get FREE delivery.
            </div>
          )}
          <div>
            <div className="py-3">
              <ul className="list-group list-group-flush">
                {cart.length === 0 ? (
                  <li className="list-group-item py-5 px-0 text-center">
                    <h6 className="mb-2">Your cart is empty</h6>
                    <p className="text-muted small">Add some fresh groceries to get started.</p>
                  </li>
                ) : (
                  cart.map(item => (
                    <li key={item.productId} className="list-group-item py-3 px-0 border-top">
                      <div className="row align-items-center g-2">
                        <div className="col-3 col-sm-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded"
                          />
                        </div>
                        <div className="col-5 col-sm-5">
                          <h6 className="mb-0 text-truncate" style={{ maxWidth: '140px' }}>{item.name}</h6>
                          <span>
                            <small className="text-muted">{item.unit}</small>
                          </span>
                          <div className="mt-2 small">
                            <Link to="#!" className="text-decoration-none" onClick={() => removeFromCart(item.productId)}>
                              <span className="me-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  <line x1={10} y1={11} x2={10} y2={17} />
                                  <line x1={14} y1={11} x2={14} y2={17} />
                                </svg>
                              </span>
                              Remove
                            </Link>
                          </div>
                        </div>
                        <div className="col-4 col-sm-5 text-end">
                          <div className="input-group input-group-sm mb-1 d-inline-flex w-auto" style={{ maxWidth: '105px' }}>
                            <button
                              type="button"
                              className="btn btn-outline-secondary btn-sm px-2 py-0"
                              onClick={() => decreaseQuantity(item.productId)}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              readOnly
                              value={item.quantity}
                              className="form-control form-control-sm text-center px-1"
                              style={{ width: '32px' }}
                              aria-label="Item quantity"
                            />
                            <button
                              type="button"
                              className="btn btn-outline-secondary btn-sm px-2 py-0"
                              onClick={() => increaseQuantity(item.productId)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <div className="fw-bold small">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-decoration-line-through text-muted small d-block">
                              ${(item.originalPrice * item.quantity).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div className="d-grid">
              <Link
                to="/ShopCheckOut"
                className="btn btn-primary btn-lg d-flex justify-content-between align-items-center"
              >
                Go to Checkout <span className="fw-bold">$\{calculateSubtotal().toFixed(2)}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <div
        className="modal fade"
        id="locationModal"
        tabIndex={-1}
        aria-labelledby="locationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-6">
              <div className="d-flex justify-content-between align-items-start ">
                <div>
                  <h5 className="mb-1" id="locationModalLabel">
                    Choose your Delivery Location
                  </h5>
                  <p className="mb-0 small">
                    Enter your address and we will specify the offer you
                    area.{" "}
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="my-5">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search your area"
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0">Select Location</h6>
                <Link
                  to="#"
                  className="btn btn-outline-gray-400 text-muted btn-sm"
                >
                  Clear All
                </Link>
              </div>
              <div>
                <div data-simplebar style={{ height: 300 }}>
                  <div className="list-group list-group-flush">
                    <Link
                      to="#"
                      className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action active"
                    >
                      <span>Alabama</span>
                      <span>Min:$20</span>
                    </Link>
                    <Link
                      to="#"
                      className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action"
                    >
                      <span>Alaska</span>
                      <span>Min:$30</span>
                    </Link>
                    <Link
                      to="#"
                      className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action"
                    >
                      <span>Arizona</span>
                      <span>Min:$50</span>
                    </Link>
                    <Link
                      to="#"
                      className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action"
                    >
                      <span>California</span>
                      <span>Min:$29</span>
                    </Link>
                    <Link
                      to="#"
                      className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action"
                    >
                      <span>Colorado</span>
                      <span>Min:$80</span>
                    </Link>
                    <Link
                      to="#"
                      className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action"
                    >
                      <span>Florida</span>
                      <span>Min:$90</span>
                    </Link>
                    <Link
                      to="#"
                      className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action"
                    >
                      <span>Arizona</span>
                      <span>Min:$50</span>
                    </Link>
                    <Link
                      to="#"
                      className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action"
                    >
                      <span>California</span>
                      <span>Min:$29</span>
                    </Link>
                    <Link
                      to="#"
                      className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action"
                    >
                      <span>Colorado</span>
                      <span>Min:$80</span>
                    </Link>
                    <Link
                      to="#"
                      className="list-group-item d-flex justify-content-between align-items-center px-2 py-3 list-group-item-action"
                    >
                      <span>Florida</span>
                      <span>Min:$90</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
    </div >
  );
};

export default Header;
