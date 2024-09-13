import React from 'react';

const StepOne = ({ nextStep }) => {
    return (
        <div className="step-one">
            <h2>Step 1: Agree Terms of Use</h2>
            {/* Your content here */}
            <button onClick={nextStep}>Next</button>
        </div>
    );
};

export default StepOne;
