// src/components/user/IDVerification.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery} from '@apollo/client'; // Import Apollo Client hooks
import '../../styles/IDVerification.css'; // Import the CSS file
import logo from '../../assets/iec-logo.png'; // Update the path to your logo image
import searchSVG from '../../assets/search.svg'; // Update the path to your SVG
import {VERIFY_ID} from '../../apollo';
import Loader from '../common/Loader'; // Import the Loader component

function IDVerification() {
    const [id, setId] = useState('');
    const navigate = useNavigate();
    const [verifyID, { data, loading, error }] = useLazyQuery(VERIFY_ID);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await verifyID({ variables: { id } });

            if (response.data.verifyID) {
                navigate('/user/login');
            } else {
                alert('Invalid ID, please try again.');
            }
        } catch (err) {
            console.error('Error verifying ID:', err);
            alert('An error occurred while verifying your ID. Please try again.');
        }
    };

    return (
        <div className="id-verification-container">
            <div className="left-half">
                <h1>Let Us Verify Your ID</h1>
                <img 
                    src={searchSVG} 
                    alt="Verification Illustration" 
                    className="svg-image" 
                />
            </div>
            <div className="right-half">
            <img src={logo} alt="Logo" className="logo-image" />
            {loading ? (
                    <Loader /> // Show loader while loading
                ) : (
                    <form onSubmit={handleSubmit} className="form">
                        <label>
                            Enter Your ID:
                            <input
                                type="text"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit" disabled={loading}>Verify ID</button>
                    </form>
                )}
                {error && <p className="error-message">Error: {error.message}</p>}
            </div>
        </div>
    );
}


export default IDVerification;
