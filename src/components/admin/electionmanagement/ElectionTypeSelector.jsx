import React from "react";

const ElectionTypeSelector = ({ selectedElectionType, setSelectedElectionType }) => {
    const types = ['National', 'Regional', 'Municipal'];

    return (
        <div className="election-type-selector">
            {types.map(type => (
                <button 
                    key={type}
                    className={`selector-button ${selectedElectionType === type ? 'active' : ''}`}
                    onClick={() => setSelectedElectionType(type)}
                >
                    {type}
                </button>
            ))}
        </div>
    );
};
export default ElectionTypeSelector;
