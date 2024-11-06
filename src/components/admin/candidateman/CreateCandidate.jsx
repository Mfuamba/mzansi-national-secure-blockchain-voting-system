// CreateCandidateForm.jsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CANDIDATE } from '../../../apollo/mutations';
import { Button, TextField, Grid, Box } from '@mui/material';

const CreateCandidateForm = ({ parties, elections, addCandidate, refetch }) => { // Default to empty arrays
    const [formData, setFormData] = useState({
        name: '',
        party: '',
        election: '',
        age: '',
        email: '',
        idNo: '',

    });
    const [loading, setLoading] = useState(false); // Loader state
    const [error, setError] = useState(''); // Error state
    const [createCandidate] = useMutation(CREATE_CANDIDATE,{
        onCompleted: (data) => {
            addCandidate(data.createCandidate); // Call addParty with the created party data
            refetch(); // Refetch parties after creation
            setLoading(false); // Stop the loader
            // Reset form fields after creation
            setFormData({
                name: '',
                party: '',
                election: '',
                age: '',
                email: '',
                idNo: '',
            });
        },
        onError: (error) => {
            setLoading(false); // Stop the loader
            console.error("Error creating candidate:", error);
            setError("An error occurred while creating a candidate. Please try again.");
        }
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start the loader

        try {
            await createCandidate({
                variables: {
                    name: formData.name,
                    party: formData.party,
                    age: formData.age,
                    election: formData.election,
                    email: formData.email,
                    identityNo: formData.idNo,
                },
            });
        }catch (err) {
            setLoading(false); // Stop the loader on error
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create-candidate-form">
            <h3>Add New Candidate</h3>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="name"
                        fullWidth
                        label="Candidate Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="idNo"
                        fullWidth
                        label="Identity Number "
                        value={formData.idNo}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="election"
                        fullWidth
                        select
                        label="Select Election"
                        value={formData.election}
                        onChange={handleChange}
                        required
                        SelectProps={{
                            native: true,
                        }}
                    >
                        <option value=""></option>
                        {elections.length > 0 ? (
                            elections.map((election) => (
                                <option key={election.id} value={election.id}>
                                    {election.name}
                                </option>
                            ))
                        ) : (
                            <option disabled>No elections available</option>
                        )}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="party"
                        fullWidth
                        select
                        label="Select Party"
                        value={formData.party}
                        onChange={handleChange}
                        required
                        SelectProps={{
                            native: true,
                        }}
                    >
                        <option value="">...</option>
                        {parties.length > 0 ? (
                            parties.map((party) => (
                                <option key={party.id} value={party.id}>
                                    {party.name}
                                </option>
                            ))
                        ) : (
                            <option disabled>No parties available</option>
                        )}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="age"
                        fullWidth
                        label="Age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="email"
                        fullWidth
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button type="submit" variant="contained" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Candidate'}
                </Button>
            </Box>
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        </form>
    );
};

export default CreateCandidateForm;
