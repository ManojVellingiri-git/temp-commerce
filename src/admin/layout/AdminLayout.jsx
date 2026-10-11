import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import './admin.css';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="admin-layout d-flex bg-light min-vh-100">
            <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            <div className="admin-main w-100 flex-grow-1">
                <AdminHeader setSidebarOpen={setSidebarOpen} />
                <div className="admin-content p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
export default AdminLayout;
