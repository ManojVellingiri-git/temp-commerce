import React, { useState } from "react";
import signupimage from '../../images/signup-g.svg'
import { Link, useNavigate } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import { brandConfig } from "../../config/brandConfig";
import { useAuth } from "../../context/AuthContext";

const MyAccountSignUp = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
        await register({ name: `${firstName} ${lastName}`, email, password });
        navigate('/Grocery-react/');
    } catch (err) {
        setError(err.message || 'Registration failed');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div>
       <>
            <ScrollToTop/>
            </>
      <>
        {/* section */}
        <section className="my-lg-14 my-8">
          {/* container */}
          <div className="container">
            {/* row */}
            <div className="row justify-content-center align-items-center">
              <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
                {/* img */}
                <img
                  src={signupimage}
                  alt={brandConfig.name}
                  className="img-fluid"
                />
              </div>
              {/* col */}
              <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
                <div className="mb-lg-9 mb-5">
                  <h1 className="mb-1 h2 fw-bold">Get Start Shopping</h1>
                  <p>Welcome to {brandConfig.name}! Enter your email to get started.</p>
                </div>
                {/* form */}
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    {error && (
                      <div className="col-12">
                        <div className="alert alert-danger p-2">{error}</div>
                      </div>
                    )}
                    {/* col */}
                    <div className="col">
                      {/* input */}
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                        aria-label="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col">
                      {/* input */}
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                        aria-label="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12">
                      {/* input */}
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12">
                      {/* input */}
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword4"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    {/* btn */}
                    <div className="col-12 d-grid">
                      {" "}
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                      </button>
                      <span className="navbar-text">
                          Already have an account?{" "}

                          <Link to="/MyAccountSignIn">Sign in</Link>
                        </span>
                    </div>
                    {/* text */}
                    <p>
                      <small>
                        By continuing, you agree to our{" "}
                        <Link to="#!"> Terms of Service</Link> &amp;{" "}
                        <Link to="#!">Privacy Policy</Link>
                      </small>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    </div>
  );
};

export default MyAccountSignUp;
