import React from 'react';
import './ProgressIndicator.css';

const ProgressIndicator = ({ currentStep }) => {
    return (
        <div className="progress-indicator">
            <div className={currentStep >= 1 ? 'active' : ''}>Step 1</div>
            <div className={currentStep >= 2 ? 'active' : ''}>Step 2</div>
            <div className={currentStep >= 3 ? 'active' : ''}>Step 3</div>
        </div>
    );
};

export default ProgressIndicator;
