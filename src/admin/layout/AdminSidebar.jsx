import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { brandConfig } from '../../config/brandConfig';

const AdminSidebar = ({ open, setOpen }) => {
    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: 'bi-grid' },
        { name: 'Products', path: '/admin/products', icon: 'bi-box' },
        { name: 'Categories', path: '/admin/categories', icon: 'bi-list' },
        { name: 'Orders', path: '/admin/orders', icon: 'bi-cart' },
        { name: 'Customers', path: '/admin/customers', icon: 'bi-people' },
        { name: 'Inventory', path: '/admin/inventory', icon: 'bi-archive' },
        { name: 'Coupons', path: '/admin/coupons', icon: 'bi-tag' },
        { name: 'Banners', path: '/admin/banners', icon: 'bi-image' },
        { name: 'Analytics', path: '/admin/analytics', icon: 'bi-bar-chart' },
        { name: 'Settings', path: '/admin/settings', icon: 'bi-gear' },
    ];

    return (
        <>
            <div className={"admin-sidebar bg-dark text-white p-3 " + (open ? "open" : "")} style={{ width: '250px', minHeight: '100vh', transition: 'all 0.3s' }}>
                <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary">
                    <Link to="/admin/dashboard" className="text-white text-decoration-none h5 mb-0 fw-bold">
                        {brandConfig.name} Admin
                    </Link>
                    <button className="btn btn-dark d-lg-none" onClick={() => setOpen(false)}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>
                <ul className="nav flex-column gap-2">
                    {menuItems.map(item => (
                        <li className="nav-item" key={item.name}>
                            <NavLink 
                                to={item.path} 
                                className={({isActive}) => "nav-link text-white rounded " + (isActive ? "bg-primary" : "hover-bg-secondary")}
                                onClick={() => setOpen(false)}
                            >
                                <i className={item.icon + " me-2"}></i>
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            {open && <div className="admin-overlay d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50 z-index-1040" onClick={() => setOpen(false)}></div>}
        </>
    );
};
export default AdminSidebar;
