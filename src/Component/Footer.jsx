import React, { useState } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import amazonpay from "../images/amazonpay.svg";
import american from "../images/american-express.svg";
import mastercard from "../images/mastercard.svg";
import paypal from "../images/paypal.svg";
import visa from "../images/visa.svg";
import { brandConfig } from "../config/brandConfig";

const Footer = () => {
  const year = new Date().getFullYear();
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  // Mobile accordion state (collapsed by default on narrow screens)
  const [openSections, setOpenSections] = useState({
    categories: false,
    consumers: false,
    about: false,
  });

  const toggleSection = (sectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="footer mt-6" role="contentinfo">
      <div className="container">
        <div className="row g-4 footer-main-row">
          {/* Column 1: Brand Info & Payment Partners */}
          <div className="col-12 col-md-6 col-lg-3 footer-col">
            <div className="footer-widget mb-3">
              <div className="footer-logo mb-2">
                <Link to="/" aria-label={`${brandConfig.name} Home`}>
                  <h2 className="brand-logo-text m-0" style={{ color: brandConfig.colors.primary, fontWeight: 700 }}>
                    {brandConfig.name}
                  </h2>
                </Link>
              </div>
              <p className="footer-brand-desc mb-3">
                We deliver more than your expectations and help you to grow
                your business exponentially by providing customized
                applications. So, don’t just think, get ready to convert
                your ideas into reality.
              </p>
            </div>

            <div className="footer-payments">
              <h5 className="footer-subheading mb-2">Payment Partners</h5>
              <ul className="list-inline d-flex flex-wrap gap-2 align-items-center mb-0 p-0">
                <li className="list-inline-item m-0">
                  <span title="Amazon Pay" className="payment-badge">
                    <img src={amazonpay} alt="Amazon Pay" className="payment-logo-img" />
                  </span>
                </li>
                <li className="list-inline-item m-0">
                  <span title="American Express" className="payment-badge">
                    <img src={american} alt="American Express" className="payment-logo-img" />
                  </span>
                </li>
                <li className="list-inline-item m-0">
                  <span title="Mastercard" className="payment-badge">
                    <img src={mastercard} alt="Mastercard" className="payment-logo-img" />
                  </span>
                </li>
                <li className="list-inline-item m-0">
                  <span title="PayPal" className="payment-badge">
                    <img src={paypal} alt="PayPal" className="payment-logo-img" />
                  </span>
                </li>
                <li className="list-inline-item m-0">
                  <span title="Visa" className="payment-badge">
                    <img src={visa} alt="Visa" className="payment-logo-img" />
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: All Category (Accordion on mobile < 768px) */}
          <div className="col-12 col-md-6 col-lg-3 footer-col">
            <div className="footer-widget mb-0">
              {/* Desktop heading */}
              <div className="d-none d-md-block">
                <h5 className="footer-heading mb-2">All Category</h5>
                <div className="line-footer mb-3" />
              </div>

              {/* Mobile accordion trigger */}
              <button
                type="button"
                className="footer-accordion-btn d-flex d-md-none justify-content-between align-items-center w-100 py-2 border-0 bg-transparent text-start"
                onClick={() => toggleSection("categories")}
                aria-expanded={openSections.categories}
                aria-controls="footer-collapse-categories"
                id="footer-header-categories"
              >
                <span className="footer-heading m-0">All Category</span>
                <span className="accordion-chevron" aria-hidden="true">
                  <i className={`fa fa-chevron-down ${openSections.categories ? "chevron-open" : ""}`} />
                </span>
              </button>

              {/* Links list */}
              <div
                id="footer-collapse-categories"
                role="region"
                aria-labelledby="footer-header-categories"
                className={`footer-accordion-body ${openSections.categories ? "is-open" : ""}`}
              >
                <ul className="footer-link list-unstyled mb-0">
                  <li>
                    <Link to="/Shop">
                      <i className="fa fa-angle-right me-1 text-muted" aria-hidden="true" />
                      Dairy, Bread &amp; Eggs
                    </Link>
                  </li>
                  <li>
                    <Link to="/Shop">
                      <i className="fa fa-angle-right me-1 text-muted" aria-hidden="true" />
                      Snacks &amp; Munchies
                    </Link>
                  </li>
                  <li>
                    <Link to="/Shop">
                      <i className="fa fa-angle-right me-1 text-muted" aria-hidden="true" />
                      Fruits &amp; Vegetables
                    </Link>
                  </li>
                  <li>
                    <Link to="/Shop">
                      <i className="fa fa-angle-right me-1 text-muted" aria-hidden="true" />
                      Cold Drinks &amp; Juices
                    </Link>
                  </li>
                  <li>
                    <Link to="/Shop">
                      <i className="fa fa-angle-right me-1 text-muted" aria-hidden="true" />
                      Breakfast &amp; Instant Food
                    </Link>
                  </li>
                  <li>
                    <Link to="/Shop">
                      <i className="fa fa-angle-right me-1 text-muted" aria-hidden="true" />
                      Bakery &amp; Biscuits
                    </Link>
                  </li>
                  <li>
                    <Link to="/Shop">
                      <i className="fa fa-angle-right me-1 text-muted" aria-hidden="true" />
                      Chicken, Meat &amp; Fish
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Column 3: For Consumers (Accordion on mobile < 768px) */}
          <div className="col-12 col-md-6 col-lg-3 footer-col">
            <div className="footer-widget mb-0">
              {/* Desktop heading */}
              <div className="d-none d-md-block">
                <h5 className="footer-heading mb-2">For Consumers</h5>
                <div className="line-footer mb-3" />
              </div>

              {/* Mobile accordion trigger */}
              <button
                type="button"
                className="footer-accordion-btn d-flex d-md-none justify-content-between align-items-center w-100 py-2 border-0 bg-transparent text-start"
                onClick={() => toggleSection("consumers")}
                aria-expanded={openSections.consumers}
                aria-controls="footer-collapse-consumers"
                id="footer-header-consumers"
              >
                <span className="footer-heading m-0">For Consumers</span>
                <span className="accordion-chevron" aria-hidden="true">
                  <i className={`fa fa-chevron-down ${openSections.consumers ? "chevron-open" : ""}`} />
                </span>
              </button>

              {/* Links list */}
              <div
                id="footer-collapse-consumers"
                role="region"
                aria-labelledby="footer-header-consumers"
                className={`footer-accordion-body ${openSections.consumers ? "is-open" : ""}`}
              >
                <ul className="footer-link list-unstyled mb-0">
                  <li>
                    <Link to="/Careers">
                      <i className="fa fa-angle-right me-1 text-muted" aria-hidden="true" />
                      Careers
                    </Link>
                  </li>

                  <li>
                    <Link to="/MyAccountOrder">
                      <i className="fa fa-angle-right me-1 text-muted" aria-hidden="true" />
                      Shipping
                    </Link>
                  </li>
                  <li>
                    <Link to="/MyAccountOrder">
                      <i className="fa fa-angle-right me-1 text-muted" aria-hidden="true" />
                      Product Returns
                    </Link>
                  </li>
                  <li>
                    <Link to="/MyAcconutPaymentMethod">
                      <i className="fa fa-angle-right me-1 text-muted" aria-hidden="true" />
                      Payments
                    </Link>
                  </li>
                  <li>
                    <Link to="/Faq">
                      <i className="fa fa-angle-right me-1 text-muted" aria-hidden="true" />
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Column 4: Get to know us, Newsletter & Social links */}
          <div className="col-12 col-md-6 col-lg-3 footer-col">
            <div className="footer-widget mb-3">
              {/* Desktop heading */}
              <div className="d-none d-md-block">
                <h5 className="footer-heading mb-2">Get to know us</h5>
                <div className="line-footer mb-3" />
              </div>

              {/* Mobile accordion trigger */}
              <button
                type="button"
                className="footer-accordion-btn d-flex d-md-none justify-content-between align-items-center w-100 py-2 border-0 bg-transparent text-start"
                onClick={() => toggleSection("about")}
                aria-expanded={openSections.about}
                aria-controls="footer-collapse-about"
                id="footer-header-about"
              >
                <span className="footer-heading m-0">Get to know us</span>
                <span className="accordion-chevron" aria-hidden="true">
                  <i className={`fa fa-chevron-down ${openSections.about ? "chevron-open" : ""}`} />
                </span>
              </button>

              {/* Links list */}
              <div
                id="footer-collapse-about"
                role="region"
                aria-labelledby="footer-header-about"
                className={`footer-accordion-body ${openSections.about ? "is-open" : ""}`}
              >
                <ul className="footer-link list-unstyled mb-0">
                  <li>
                    <Link to="/AboutUs">
                      <i className="fa fa-angle-right me-1 text-muted" aria-hidden="true" />
                      Company
                    </Link>
                  </li>
                  <li>
                    <Link to="/AboutUs">
                      <i className="fa fa-angle-right me-1 text-muted" aria-hidden="true" />
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/Blog">
                      <i className="fa fa-angle-right me-1 text-muted" aria-hidden="true" />
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/helpcenter">
                      <i className="fa fa-angle-right me-1 text-muted" aria-hidden="true" />
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link to="/Blog">
                      <i className="fa fa-angle-right me-1 text-muted" aria-hidden="true" />
                      Our Value
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter & Social Section */}
            <div className="footer-newsletter-wrap pt-2">
              <h5 className="footer-subheading mb-2">Subscribe to newsletter</h5>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form mb-3">
                <div className="input-group">
                  <input
                    type="email"
                    id="footer-newsletter-email"
                    name="email"
                    placeholder="Your Email"
                    className="form-control"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    aria-label="Your Email"
                    required
                  />
                  <button
                    className="btn btn-primary btn-newsletter px-3"
                    type="submit"
                    aria-label="Subscribe"
                  >
                    <i className="fa fa-paper-plane" aria-hidden="true" />
                  </button>
                </div>
                {subscribed && (
                  <div className="text-success small mt-1 animate-fade-in" role="alert">
                    <i className="fa fa-check-circle me-1" /> Thank you for subscribing!
                  </div>
                )}
              </form>

              {/* Social Media Links */}
              <div className="footer-social-wrap">
                <ul className="social-media d-flex gap-2 p-0 m-0 list-unstyled" aria-label="Social links">
                  <li>
                    <a
                      href={brandConfig.social.facebook}
                      className="social-btn facebook"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                    >
                      <i className="bx bxl-facebook" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={brandConfig.social.whatsapp}
                      className="social-btn whatsapp"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                    >
                      <i className="bx bxl-whatsapp" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={brandConfig.social.instagram}
                      className="social-btn instagram"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <i className="bx bxl-instagram" aria-hidden="true" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={brandConfig.social.youtube}
                      className="social-btn youtube"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                    >
                      <i className="bx bxl-youtube" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bar mt-4 pt-3 border-top">
        <div className="container text-center">
          <p className="copyright mb-0 text-muted small">
            © {year} {brandConfig.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
