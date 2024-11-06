import React from 'react';
import { useState } from 'react';
import VotingModal from './VoteModal';
import '../../styles/OngoingElections.css';



const OngoingElections = () => {
    const [isModalOpen, SetIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        SetIsModalOpen(true);
    };

    const handleCloseModal = () => {
        SetIsModalOpen(false);
    };

    const handleVote = (candidateId) => {
        console.log('Voted for candidate:', candidateId);

    };
    return (
        <section className="card ongoing-elections">
            <h3>Ongoing Elections</h3>
            <p>Presidential Election</p>
            <p>Ends on: [Date]</p>
            <button className="primary-button" onClick={handleOpenModal}>Vote Now</button>
            <VotingModal open={isModalOpen} handleClose={handleCloseModal} handleVote={handleVote}/>
        </section>
    );
};

export default OngoingElections;
