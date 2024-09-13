// src/components/common/Layout.jsx
import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/user/VoterHeader';

const VoterLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="voter-layout-content">
                <Sidebar />
                <div className="voter-layout-main">
                    {children}
                </div>
            </div>
      
    </div>
  );
};

export default VoterLayout;
