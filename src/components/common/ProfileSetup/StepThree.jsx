import React from 'react';

const StepThree = ({ prevStep }) => {
    return (
        <div className="step-three">
            <h2>Step 3: Complete Registration</h2>
            {/* Your content here */}
            <button onClick={prevStep}>Back</button>
            <button>Finish</button>
        </div>
    );
};

export default StepThree;
