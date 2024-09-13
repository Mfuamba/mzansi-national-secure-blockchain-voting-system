import React from 'react';
import OngoingElections from './OngoingElections';
import VoteHistory from './VoteHistory';
import Notifications from './Notifications';
import Parties from './PartyCard';
import LiveResults from './LiveResults';
import '../../styles/VoterOverview.css';

const AdminOverview = () => {
    return (
        <div className="overview-container">
            <LiveResults className="live-results" />
            <div className="overview-grid">
                <OngoingElections />
                <VoteHistory />
                <Notifications />
            </div>
            
            <Parties />
            
        </div>
    );
};

export default AdminOverview;
