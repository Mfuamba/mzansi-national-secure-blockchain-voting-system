import React from 'react';
import '../../styles/Notifications.css';

const Notifications = () => {
    return (
        <section className="card notifications">
            <h3>Notifications</h3>
            <p>You have a pending update on your profile.</p>
            <button className="primary-button">Review Now</button>
        </section>
    );
};

export default Notifications;
