import React from 'react';
import '../../styles/Notifications.css';

const TotalvotesCard = () => {
    return (
        <section className="card notifications">
            <h3>Total Votes</h3>
            <p>You have a pending update on your profile.</p>
            <button className="primary-button">Review Now</button>
        </section>
    );
};

export default TotalvotesCard;
