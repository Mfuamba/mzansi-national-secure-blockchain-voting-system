import React from 'react';

const StepTwo = ({ nextStep, prevStep }) => {
    return (
        <div className="step-two">
            <h2>Step 2: Verify Identity</h2>
            {/* Your content here */}
            <button onClick={prevStep}>Back</button>
            <button onClick={nextStep}>Next</button>
        </div>
    );
};

export default StepTwo;
