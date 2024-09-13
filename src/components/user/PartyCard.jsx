import React, { useState } from 'react';
import '../../styles/PartyCard.css';

const PartyCard = () => {
    const [activeTab, setActiveTab] = useState('National');
    const [searchTerm, setSearchTerm] = useState('');

    const allParties = {
        National: [
            { name: 'Party ANC', representative: 'John Doe', contact: 'john@example.com' },
            { name: 'Party DA', representative: 'Jane Doe', contact: 'jane@example.com' },
            { name: 'Party EFF', representative: 'Bob Smith', contact: 'bob@example.com' },
            // Add more national parties here...
        ],
        Provincial: [
            { name: 'Party MK', representative: 'Alice Johnson', contact: 'alice@example.com' },
            { name: 'Party IFP', representative: 'Tom Williams', contact: 'tom@example.com' },
            // Add more provincial parties here...
        ],
        Regional: [
            { name: 'Party C', representative: 'Emma Brown', contact: 'emma@example.com' },
            { name: 'Party D', representative: 'Mike Davis', contact: 'mike@example.com' },
            // Add more regional parties here...
        ],
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredParties = allParties[activeTab].filter((party) =>
        party.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="card parties">
            <div className="parties-header">
                <h3>Political Parties & Representatives</h3>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search parties..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className="tabs">
                {Object.keys(allParties).map((tab) => (
                    <button
                        key={tab}
                        className={`tab-link ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab(tab);
                            setSearchTerm('');
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="party-list">
                {filteredParties.length > 0 ? (
                    filteredParties.map((party, index) => (
                        <div key={index} className="party-card">
                            <h4>{party.name}</h4>
                            <p><strong>Representative:</strong> {party.representative}</p>
                            <p><strong>Contact:</strong> {party.contact}</p>
                        </div>
                    ))
                ) : (
                    <div className="no-results">No parties found.</div>
                )}
            </div>
        </section>
    );
};

export default PartyCard;
