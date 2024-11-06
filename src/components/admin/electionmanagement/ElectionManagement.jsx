import React, { useState, useEffect } from 'react';
import '../styles/ElecMan.css';
import CreateElectionForm from './CreateElectionForm';
import ElectionStats from './ElectionStats';
import ElectionTable from './ElectionTable';
import EditElectionModal from './EditElectionModal';
import { useQuery } from '@apollo/client';
import { GET_ELECTIONS } from '../../../apollo/queries'; // Add your query for fetching elections

const ElectionManagement = () => {
    const [selectedElectionType] = useState('National');
    const [elections, setElections] = useState([]);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [currentElection, setCurrentElection] = useState(null);
    const [message, setMessage] = useState("");

    // Fetch elections from the backend when the component loads
    const { loading, data, refetch } = useQuery(GET_ELECTIONS);

    useEffect(() => {
        if (data && data.elections) {
            setElections(data.elections);
        }
    }, [data]);

    const addElection = (newElection) => {
        setElections([...elections, newElection]);
        setMessage("Election added successfully!");
    };

    const handleEditClick = (election) => {
        setCurrentElection(election); // Set the current election to be edited
        setEditModalVisible(true);    // Show the edit modal
    };

    const editElection = (updatedElection) => {
        setElections(
            elections.map(election => 
                election.id === updatedElection.id ? updatedElection : election
            )
        );
        setEditModalVisible(false); // Close the modal after editing
        setMessage("Election updated successfully!");
    };

    const deleteElection = (id) => {
        if (window.confirm("Are you sure you want to delete this election?")) {
            setElections(elections.filter(election => election.id !== id));
            setMessage("Election deleted successfully.");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="electionmanagement-container">            
            <CreateElectionForm 
                electionType={selectedElectionType} 
                addElection={addElection} 
                refetchElections={refetch} // Refetch elections after creating a new one
            />
            
            <ElectionStats electionType={selectedElectionType} totalElections={elections.length} /> {/* Pass total elections count */}

            {message && <p className="message">{message}</p>}

            {editModalVisible && (
                <EditElectionModal 
                    election={currentElection}
                    onSave={editElection}
                    onClose={() => setEditModalVisible(false)}
                />
            )}

            {/* Pass elections and the handleEditClick function to the ElectionTable */}
            <ElectionTable 
                elections={elections} 
                onEdit={handleEditClick} // Pass edit handler
                onDelete={deleteElection} // Optionally pass delete handler
            />
        </div>
    );
};

export default ElectionManagement;
