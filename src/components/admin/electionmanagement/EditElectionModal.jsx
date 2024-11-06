import React, { useState } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';

const EditElectionModal = ({ election, onSave, onClose }) => {
  const [name, setName] = useState(election?.name || '');
  const [date, setDate] = useState(election?.date || '');
  const [status, setStatus] = useState(election?.status || '');

  const handleSave = () => {
    const updatedElection = { ...election, name, date, status };
    onSave(updatedElection); // Trigger save action
  };

  return (
    <Modal open={!!election} onClose={onClose}>
      <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: 1, width: 400, mx: 'auto', mt: '10%' }}>
        <h2>Edit Election</h2>
        <TextField
          label="Election Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose} sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditElectionModal;
