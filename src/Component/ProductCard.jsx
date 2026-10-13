import React from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddClick = (e) => {
    e.preventDefault();
    addToCart(product);
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      text: `${product.name} has been added to your cart!`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<i key={i} className="bi bi-star-fill" />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<i key={i} className="bi bi-star-half" />);
      } else {
        stars.push(<i key={i} className="bi bi-star" />);
      }
    }
    return stars;
  };

  return (
    <div className="col">
      <div className="card card-product shadow-sm">
        <div className="card-body p-2 p-sm-3">
          <div className="text-center position-relative mb-2">
            <Link to="/Shop">
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid product-card-img"
              />
            </Link>
            <div className="card-product-action">
              <Link
                to="#"
                className="btn-action"
                data-bs-toggle="modal"
                data-bs-target="#quickViewModal"
                aria-label="Quick View"
              >
                <i
                  className="bi bi-eye"
                  data-bs-toggle="tooltip"
                  data-bs-html="true"
                  title="Quick View"
                />
              </Link>
              <Link
                to="#"
                className="btn-action"
                data-bs-toggle="tooltip"
                data-bs-html="true"
                title="Compare"
                aria-label="Compare"
              >
                <i className="bi bi-arrow-left-right" />
              </Link>
            </div>
          </div>
          <div className="text-small mb-1">
            <Link to="/Shop" className="text-decoration-none text-muted">
              <small className="text-truncate d-block">{product.category}</small>
            </Link>
          </div>
          <h2 className="fs-6 product-card-title mb-1">
            <Link
              to="/Shop"
              className="text-inherit text-decoration-none"
            >
              {product.name}
            </Link>
          </h2>
          <div className="text-warning small mb-2 d-flex align-items-center flex-wrap gap-1">
            <span className="me-1">{renderStars(product.rating)}</span>
            <span className="text-muted">({product.reviews})</span>
          </div>
          <div className="d-flex justify-content-between align-items-center product-card-action-bar">
            <div>
              <span className="text-dark fw-bold fs-6">₹{product.price}</span>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary btn-sm px-2 py-1 d-inline-flex align-items-center"
                onClick={handleAddClick}
                aria-label={`Add ${product.name} to cart`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-plus me-1"
                >
                  <line x1={12} y1={5} x2={12} y2={19} />
                  <line x1={5} y1={12} x2={19} y2={12} />
                </svg>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
