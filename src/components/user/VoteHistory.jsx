import React from 'react';
import '../../styles/VoteHistory.css';

const VoteHistory = () => {
    return (
        <section className="card vote-history">
            <h3>Vote History</h3>
            <p>Previous Election: [Candidate]</p>
            <p>Date: [Date]</p>
        </section>
    );
};

export default VoteHistory;
