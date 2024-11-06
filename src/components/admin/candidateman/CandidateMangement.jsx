import React, { useState, useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { GET_ELECTIONS, GET_CANDIDATES, GET_PARTIES } from '../../../apollo/queries';
import CreateCandidateForm from './CreateCandidate';
import CandidateOverview from './CandOverview'; // Assume you have a candidate overview component
import EditCandidateModal from './EditCandidateModal';
import Loader from '../../common/Loader';
import '../styles/CandManagement.css';

const CandidateManagement = () => {
    // State management
    const [candidates, setCandidates] = useState([]); // State to store candidates
    const [editCandidate, setEditCandidate] = useState(false);
    const [currentCandidate, setCurrentCandidate] = useState(null);
    const [message, setMessage] = useState("");

    // Fetch parties and elections using Apollo's useQuery hook
    const { loading: loadingCandidates, data: dataCandidates, error: candidateError,refetch: refetchCandidates } = useQuery(GET_CANDIDATES);
    const { loading: loadingElections, data: dataElections, error: electionError } = useQuery(GET_ELECTIONS);
    const { loading: loadingParties, data: dataParties, error: partyError } = useQuery(GET_PARTIES);

    // Effect to set candidates when data is fetched
    useEffect(() => {
        if (dataCandidates && dataCandidates.candidates) {
            setCandidates(dataCandidates.candidates); // Set candidates from parties
        }
    }, [dataCandidates]);

    // Loader display while fetching data
    if (loadingCandidates || loadingElections || loadingParties) return <Loader />;

    // Error handling for fetching parties or elections
    if (partyError || electionError || candidateError) {
        console.error("Error fetching parties or elections:", partyError, electionError);
        return <p>Error fetching parties or elections: {partyError?.message || electionError?.message}</p>;
    }

    // Extract elections and parties from the query results
    const elections = dataElections?.elections || [];
    const parties = dataParties?.parties || [];

    // Function to handle adding a new candidate
    const handleAddCandidate = (newCandidate) => {
        setMessage("Candidate added successfully!");
        refetchCandidates(); // Ensure we refetch the parties after adding
    };

    // Function to handle editing a candidate
    const handleEditCandidate = (candidate) => {
        setCurrentCandidate(candidate);
        setEditCandidate(true);
    };

    // Function to save edited candidate
    const editCandidateHandler = (updatedCandidate) => {
        setCandidates(
            candidates.map(candidate => 
                candidate.id === updatedCandidate.id ? updatedCandidate : candidate
            )
        );
        setEditCandidate(false); // Close the edit modal
        setMessage("Candidate updated successfully!");
    };

    // Function to handle candidate deletion
    const deleteCandidate = (id) => {
        if (window.confirm("Are you sure you want to delete this candidate?")) {
            setCandidates(candidates.filter(candidate => candidate.id !== id));
            setMessage("Candidate deleted successfully.");
        }
    };

    return (
        <div className="candidate-management">
            <h2>Manage Candidates</h2>
            {/* Pass elections and action handler to CreateCandidateForm */}
            <CreateCandidateForm 
                parties={parties} 
                elections={elections} 
                refetch={refetchCandidates}
                addCandidate={handleAddCandidate} 
            />
            {message && <p className="message">{message}</p>}
            {/* Pass candidates and action handlers to CandidateOverview */}
            <CandidateOverview 
                candidates={candidates} 
                onEdit={handleEditCandidate} 
                onDelete={deleteCandidate} 
            />
            {editCandidate && (
                <EditCandidateModal 
                    candidate={currentCandidate} 
                    onSave={editCandidateHandler} 
                    onClose={() => setEditCandidate(false)} 
                />
            )}
        </div>
    );
};

export default CandidateManagement;
