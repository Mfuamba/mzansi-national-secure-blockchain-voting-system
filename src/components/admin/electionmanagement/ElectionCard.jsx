import React from 'react';

const ElectionCard = ({ election, onDelete, onEdit }) => {
    const handleDelete = () => {
        onDelete(election.id);
    };

    const handleEdit = () => {
        onEdit(election); // Pass the election data to be edited
    };

    return (
        <div className="election-card">
            <h3>{election.name}</h3>
            <p>Type: {election.type}</p>
            <p>Status: {election.status}</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default ElectionCard;
