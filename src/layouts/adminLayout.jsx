// src/components/common/Layout.jsx
import React from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import Header from '../components/user/VoterHeader';

const AdminLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="admin-layout-content">
                <AdminSidebar />
                <div className="admin-layout-main">
                    {children}
                </div>
            </div>
      
    </div>
  );
};

export default AdminLayout;
