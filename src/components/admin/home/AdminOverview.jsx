import React from 'react';
import NumofParties from './NumofParties';
//import Notifications from './Notifications';
//import Parties from './PartyCard';
//import LiveResults from './LiveResults';
import '../../admin/styles/AdminOverview.css';
import CandidateCard from './CandidateCard';
import NumofVoters from './NumofVoters';
import TotVotes from './TotVotes';
import LiveResults from '../../user/LiveResults';
//<Notifications />
//            <LiveResults className="live-results" />
//<Parties />
const AdminOverview = () => {
    return (
        <div className="adminoverview-container">
            <div className="adminoverview-grid">
                <NumofParties/>
                <CandidateCard/>
                <NumofVoters/>
                <TotVotes/>
            </div>
            <LiveResults className="live-results" />

        </div>
    );
};

export default AdminOverview;
