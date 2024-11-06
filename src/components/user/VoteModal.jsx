import React, { useState, useEffect } from 'react';
import Web3 from 'web3'; // Import Web3
import { useMutation,useQuery } from '@apollo/client';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import { GET_CANDIDATES, GET_PARTIES, GET_ELECTIONS } from '../../apollo/queries';
import {CAST_VOTE } from '../../apollo/mutations';
import CloseIcon from '@mui/icons-material/Close';
import Loader from '../common/Loader';
import SearchBar from '../TableHeader/SearchBar'; // Assuming your SearchBar component is in the same directory
import ContractAbi from '../abis/VotingContract.json';
// Replace this with your contract ABI and address
const CONTRACT_ABI = ContractAbi.abi;
const CONTRACT_ADDRESS = "0x40802CA7671d015808c4cAb7024b0B2D2A810d9F";

const VotingModal = ({ open, handleClose, handleVote }) => {
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [castVote, { loading: votingLoading, error: votingError }] = useMutation(CAST_VOTE);

    const { loading: loadingCandidates, data: dataCandidates, error: candidateError } = useQuery(GET_CANDIDATES);
    const { loading: loadingParties, data: dataParties, error: partyError } = useQuery(GET_PARTIES);

    useEffect(() => {
        if (dataCandidates && dataCandidates.candidates) {
            setCandidates(dataCandidates.candidates);
            console.log("Candidates data with electionId:", dataCandidates.candidates);

        }
    }, [dataCandidates]);

    // Initialize Web3 and Contract on load
    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                try {
                    const web3Instance = new Web3(window.ethereum);
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const accounts = await web3Instance.eth.getAccounts();
                    setAccount(accounts[0]);
                    setWeb3(web3Instance);
                    const contractInstance = new web3Instance.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
                    setContract(contractInstance);
                } catch (error) {
                    console.error("Web3 initialization error:", error);
                }
            } else {
                console.error("MetaMask not found. Please install it.");
            }
        };
        initWeb3();
    }, []);
    const handleCandidateSelect = (candidate) => {
        console.log("The set cAndidate:", candidate);

        setSelectedCandidate(candidate);
        setConfirmModalOpen(true);
    };

    const handleConfirmVote = async () => {
      if (contract && selectedCandidate && account) {
          try {
            console.log("Selected Candidate BOY:", selectedCandidate);

            const response = await castVote({
                variables: {
                    electionId: selectedCandidate.election.id,
                    candidateId: selectedCandidate.id,
                    walletAddress: account,
                },
            });

            if (response.data.castVote.success) {
                alert(`You have successfully voted for ${selectedCandidate.name}`);
                handleClose();
                setConfirmModalOpen(false);
            } else {
                alert(response.data.castVote.message);
            }
        } catch (error) {
            console.error("Error during voting:", error);
            alert("Failed to cast vote. Please try again.");
      } }
      else {
          alert("Contract or account not initialized.");
      }
  };
  

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '10px',
        p: 4,
        outline: 'none',
        maxHeight: '80vh',
        overflowY: 'auto',
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
        position: 'relative',
    };

    const closeButtonStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: '10px',
    };

    const candidateGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        justifyContent: 'space-around',
    };

    const candidateStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '30px',
    };

    if (loadingCandidates || loadingParties) return <Loader />;

    if (candidateError || partyError) {
        return (
            <Typography variant="h6" color="error">
                Error loading data. Please try again later.
            </Typography>
        );
    }

    return (
        <>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-vote-title">
                <Box sx={style}>
                    <IconButton onClick={handleClose} sx={closeButtonStyle}>
                        <CloseIcon />
                    </IconButton>

                    <div style={headerStyle}>
                        <Typography id="modal-vote-title" variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                            Choose Your Candidate
                        </Typography>
                    </div>

                    <Box sx={{ marginBottom: '20px' }}>
                        <SearchBar onChange={console.log} value={""} onClick={console.log} />
                    </Box>

                    <Box sx={candidateGridStyle}>
                        {candidates.map((candidate) => (
                            <Box key={candidate.id} sx={candidateStyle}>
                                <img src={candidate.img} alt={candidate.name} style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                                <Typography variant="h6" sx={{ marginTop: '10px' }}>{candidate.name}</Typography>
                                <Typography variant="body2" sx={{ color: 'gray' }}>{candidate.party?.name}</Typography>
                                <Typography variant="body2" sx={{ color: 'gray' }}>{candidate.election?.name}</Typography>
                                <button
                                    className="primary-button"
                                    onClick={() => handleCandidateSelect(candidate)}
                                    style={{ marginTop: '15px' }}
                                >
                                    Vote for {candidate.party?.partyAbbrev}
                                </button>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Modal>

            <Modal open={isConfirmModalOpen} onClose={() => setConfirmModalOpen(false)} aria-labelledby="modal-confirm-title">
                <Box sx={style}>
                    <IconButton onClick={() => setConfirmModalOpen(false)} sx={closeButtonStyle}>
                        <CloseIcon />
                    </IconButton>

                    <div style={headerStyle}>
                        <Typography id="modal-confirm-title" variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                            Confirm Your Vote
                        </Typography>
                    </div>

                    <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: '20px' }}>
                        Are you sure you want to vote for {selectedCandidate?.name} from {selectedCandidate?.party?.name}?
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                        <Button variant="contained" color="primary" onClick={handleConfirmVote}>
                            Confirm Vote
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={() => setConfirmModalOpen(false)}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default VotingModal;
