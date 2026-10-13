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
    <div className="col fade-zoom">
      <div className="card card-product">
        <div className="card-body">
          <div className="text-center position-relative">
            {product.badge && (
              <div className="position-absolute top-0 start-0">
                <span className={`badge bg-${product.badge.type}`}>{product.badge.text}</span>
              </div>
            )}
            <Link to={`/ProductSingle`}>
              <img
                src={product.image}
                alt={product.name}
                className="mb-3 img-fluid"
              />
            </Link>
            <div className="card-product-action">
              <Link
                to="#"
                className="btn-action"
                data-bs-toggle="modal"
                data-bs-target="#quickViewModal"
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
              >
                <i className="bi bi-arrow-left-right" />
              </Link>
            </div>
          </div>
          <div className="text-small mb-1">
            <Link to="#!" className="text-decoration-none text-muted">
              <small>{product.category}</small>
            </Link>
          </div>
          <h2 className="fs-6">
            <Link
              to="/ProductSingle"
              className="text-inherit text-decoration-none"
            >
              {product.name}
            </Link>
          </h2>
          <div className="text-warning">
            <small>
              {renderStars(product.rating)}
            </small>{" "}
            <span className="text-muted small">{product.rating} ({product.reviews})</span>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <span className="text-dark">₹{product.price}</span>{" "}
              {product.originalPrice && (
                <span className="text-decoration-line-through text-muted">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <div>
              <Link to="#" className="btn btn-primary btn-sm" onClick={handleAddClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-plus"
                >
                  <line x1={12} y1={5} x2={12} y2={19} />
                  <line x1={5} y1={12} x2={19} y2={12} />
                </svg>{" "}
                Add
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
