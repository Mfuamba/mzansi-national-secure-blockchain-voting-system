// src/components/voter/VoterRegister.js

import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const REGISTER_VOTER = gql`
    mutation RegisterVoter($name: String!, $email: String!, $password: String!) {
        registerVoter(name: $name, email: $email, password: $password) {
            id
        }
    }
`;

const VoterRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [registerVoter] = useMutation(REGISTER_VOTER);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            await registerVoter({ variables: { name, email, password } });
            setSuccess('Registration successful. Please login.');
            setError('');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="voter-register">
            <h2>Voter Registration</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default VoterRegister;
