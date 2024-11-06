import React from "react";

const ElectionStats = ({ electionType }) => {
    return (
        <div className="election-stats-grid">
            <div className="election-card">Total {electionType} Elections: 5</div>
            <div className="election-card">Total Registered Voters: 120,000</div>
            {/* More stats and graphs */}
        </div>
    );
};
export default ElectionStats;
