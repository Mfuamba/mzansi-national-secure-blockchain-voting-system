import React from 'react';
import '../../styles/OngoingElections.css';

const OngoingElections = () => {
    return (
        <section className="card ongoing-elections">
            <h3>Ongoing Elections</h3>
            <p>Presidential Election</p>
            <p>Ends on: [Date]</p>
            <button className="primary-button">Vote Now</button>
        </section>
    );
};

export default OngoingElections;
