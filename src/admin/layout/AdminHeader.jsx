import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminHeader = ({ setSidebarOpen }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/Grocery-react/");
    };
    return (
        <header className="admin-header bg-white shadow-sm p-3 d-flex justify-content-between align-items-center position-sticky top-0 z-1030">
            <button className="btn btn-light d-lg-none" onClick={() => setSidebarOpen(true)}>
                <i className="bi bi-list"></i>
            </button>
            <div className="ms-auto d-flex gap-3 align-items-center">
                <div className="position-relative">
                    <i className="bi bi-bell fs-5"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.65rem'}}>3</span>
                </div>
                <div className="dropdown">
                    <Link to="#!" className="text-dark text-decoration-none dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
                        <img src="https://ui-avatars.com/api/?name=Admin+User&background=random" alt="Admin" className="rounded-circle me-2" style={{width: '32px', height: '32px'}} />
                        <span>{user?.name || 'Admin User'}</span>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><span className="dropdown-item-text text-muted small">{user?.email}</span></li>
                        <li><Link className="dropdown-item" to="/admin/settings">Settings</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="/Grocery-react/">Back to Store</Link></li>
                        <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                    </ul>
                </div>
            </div>
        </header>
    );
};
export default AdminHeader;
