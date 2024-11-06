import React, { useState } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';
import { useMutation } from '@apollo/client';
import { UPDATE_CANDIDATE } from '../../../apollo/mutations';

const EditCandidateModal = ({ candidate, onClose, refetch }) => {
    const [candidateName, setCandidateName] = useState(candidate.name);
    const [updateCandidate] = useMutation(UPDATE_CANDIDATE);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCandidate({
                variables: {
                    candidateId: candidate.id,
                    name: candidateName,
                },
            });
            refetch(); // Refetch candidates after update
            onClose(); // Close modal on successful update
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal open={!!candidate} onClose={onClose}>
            <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 1, width: 400, mx: 'auto', mt: '10%' }}>
                <h2>Edit Candidate</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Candidate Name"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Box sx={{ mt: 2 }}>
                        <Button variant="contained" color="primary" type="submit">
                            Save Changes
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={onClose} sx={{ ml: 2 }}>
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default EditCandidateModal;
