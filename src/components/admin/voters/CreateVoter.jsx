// CreateVoterForm.jsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_VOTER } from '../../../apollo/mutations';

const CreateVoterForm = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [email, setEmail] = useState('');
    
    const [createVoter, { loading, error }] = useMutation(CREATE_VOTER);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createVoter({
                variables: {
                    name,
                    surname,
                    idNumber,
                    email,
                },
                refetchQueries: ['GET_CURRENT_VOTERS'], // Optional: refetch the list of voters after adding a new one
            });
            // Clear form fields after submission
            setName('');
            setSurname('');
            setIdNumber('');
            setEmail('');
        } catch (err) {
            console.error("Error creating voter:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create-voter-form">
            <h3>Add New Voter</h3>
            <input
                type="text"
                placeholder="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="ID Number"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Voter'}
            </button>
            {error && <p>Error: {error.message}</p>}
        </form>
    );
};

export default CreateVoterForm;
