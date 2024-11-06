import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ELECTIONS, GET_PARTIES } from '../../../apollo/queries';
import CreatePartyForm from './CreatePartyForm';
import PartyOverview from './PartyOverview';
import EditPartyModal from './EditPartyModal';
import Loader from '../../common/Loader';
import '../styles/PartManagement.css';

const PartyManagement = () => {
    // State management
    const [parties, setParties] = useState([]);
    const [editParty, setEditParty] = useState(false);
    const [currentParty, setCurrentParty] = useState(null);
    const [message, setMessage] = useState("");

    // Fetch parties and elections using Apollo's useQuery hook
    const { loading: loadingParties, data: dataParties, error: partyError, refetch: refetchParties } = useQuery(GET_PARTIES);
    const { loading: loadingElections, data: dataElections, error: electionError } = useQuery(GET_ELECTIONS);

    // Effect to set parties when data is fetched
    useEffect(() => {
        if (dataParties && dataParties.parties) {
            setParties(dataParties.parties);
        }
    }, [dataParties]);

    // Loader display while fetching data
    if (loadingParties || loadingElections) return <Loader />;

    // Error handling for fetching parties or elections
    if (partyError || electionError) {
        console.error("Error fetching parties or elections:", partyError, electionError);
        return <p>Error fetching parties or elections: {partyError?.message || electionError?.message}</p>;
    }

    // Extract elections from the query results
    const elections = dataElections?.elections || [];

    // Function to handle adding a new party
    const handleAddParty = (newParty) => {
        setMessage("Party added successfully!");
        refetchParties(); // Ensure we refetch the parties after adding
    };

    // Function to handle editing a party
    const handleEditParty = (party) => {
        setCurrentParty(party);
        setEditParty(true);
    };

    // Function to save edited party
    const editPartyHandler = (updatedParty) => {
        setParties(
            parties.map(party => 
                party.id === updatedParty.id ? updatedParty : party
            )
        );
        setEditParty(false); // Close the edit modal
        setMessage("Party updated successfully!");
    };

    // Function to handle party deletion
    const deleteParty = (id) => {
        if (window.confirm("Are you sure you want to delete this party?")) {
            setParties(parties.filter(party => party.id !== id));
            setMessage("Party deleted successfully.");
        }
    };

    return (
        <div className="party-management-container">
            <h2>Manage Political Parties</h2>
            {/* Pass elections to the CreatePartyForm */}
            <CreatePartyForm elections={elections} addParty={handleAddParty} refetch={refetchParties} />
            {message && <p className="message">{message}</p>}
            {/* Pass parties and action handlers to PartyOverview */}
            <PartyOverview 
                party={parties} 
                onEdit={handleEditParty} 
                onDelete={deleteParty} 
            />
            {editParty && (
                <EditPartyModal 
                    party={currentParty} 
                    onSave={editPartyHandler} 
                    onClose={() => setEditParty(null)} 
                />
            )}
        </div>
    );
};

export default PartyManagement;
