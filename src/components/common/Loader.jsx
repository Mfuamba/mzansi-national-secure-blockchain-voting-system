// src/components/common/Loader.jsx

import React from 'react';
import '../../styles/Loader.css'; // Create this CSS file for styling the loader

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="spinner"></div>
        </div>
    );
};

export default Loader;
