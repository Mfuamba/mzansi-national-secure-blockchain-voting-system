// src/components/common/Layout.jsx
import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/user/VoterHeader';

const AdminLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="admin-layout-content">
                <Sidebar />
                <div className="admin-layout-main">
                    {children}
                </div>
            </div>
      
    </div>
  );
};

export default AdminLayout;
