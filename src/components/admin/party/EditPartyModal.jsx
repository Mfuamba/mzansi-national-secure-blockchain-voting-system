import React, { useState } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';
import { useMutation } from '@apollo/client';
import { UPDATE_PARTY } from '../../../apollo/mutations';

const EditPartyModal = ({ party, onClose, refetch }) => {
    const [partyName, setPartyName] = useState(party.name);
    const [leader, setLeader] = useState(party.leader);
    const [description, setDescription] = useState(party.description);
    const [updateParty] = useMutation(UPDATE_PARTY);

    const handleUpdateParty = async (e) => {
        e.preventDefault();
        try {
            await updateParty({
                variables: {
                    id: party.id,
                    name: partyName,
                    leader,
                    description,
                },
            });
            refetch(); // Refetch parties after update
            onClose(); // Close modal after successful update
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal open={!!party} onClose={onClose}>
            <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 1, width: 400, mx: 'auto', mt: '10%' }}>
                <h2>Edit Political Party</h2>
                <form onSubmit={handleUpdateParty}>
                    <TextField
                        label="Party Name"
                        value={partyName}
                        onChange={(e) => setPartyName(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Leader"
                        value={leader}
                        onChange={(e) => setLeader(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
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

export default EditPartyModal;
