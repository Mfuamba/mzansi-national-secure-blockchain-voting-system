import React from 'react';

const PartyCard = ({ party, onEdit }) => {
    return (
        <div className="party-card">
            <h4>{party.name}</h4>
            <p>Leader: {party.leader}</p>
            <p>Election: {party.election.name}</p>
            <p>{party.description}</p>
            <button onClick={onEdit}>Edit</button>
        </div>
    );
};

export default PartyCard;
