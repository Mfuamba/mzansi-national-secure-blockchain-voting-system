// VoterManagement.jsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_VOTERS } from '../../../apollo/queries';
import CreateVoterForm from './CreateVoter';
import VoterOverview from './VoterOverview';
import '../styles/VoterManagement.css';

const VoterManagement = () => {
    const { data: votersData, loading: loadingVoters } = useQuery(GET_CURRENT_VOTERS);

    if (loadingVoters) {
        return <p>Loading voters...</p>; // Show a loading message while fetching data
    }

    return (
        <div className="voters-management-container">
            <h2>Manage Voters</h2>
            <CreateVoterForm />
            <VoterOverview voters={votersData?.currentVoters || []} />
        </div>
    );
};

export default VoterManagement;
