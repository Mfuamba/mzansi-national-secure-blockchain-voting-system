import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PARTY } from '../../../apollo/mutations'; // Your GraphQL mutation for creating a party
import Loader from '../../common/Loader';

const CreatePartyForm = ({ elections, addParty, refetch }) => {
    const [formData, setFormData] = useState({
        name: '',
        regNum: '',
        partyAbbrev: '',
        selectedElection: '',
        description: '',
        officeTel: '',
    });

    const [logo, setLogo] = useState(null); // For handling logo upload
    const [loading, setLoading] = useState(false); // Loader state
    const [error, setError] = useState(''); // Error state

    const [createParty] = useMutation(CREATE_PARTY, {
        onCompleted: (data) => {
            addParty(data.createParty); // Call addParty with the created party data
            refetch(); // Refetch parties after creation
            setLoading(false); // Stop the loader
            // Reset form fields after creation
            setFormData({
                name: '',
                regNum: '',
                partyAbbrev: '',
                selectedElection: '',
                description: '',
                officeTel: '',
            });
            setLogo(null); // Reset logo state
        },
        onError: (error) => {
            setLoading(false); // Stop the loader
            console.error("Error creating party:", error);
            setError("An error occurred while creating the party. Please try again.");
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogoUpload = async () => {
        if (!logo) return null;

        const formData = new FormData();
        formData.append('file', logo);

        try {
            const response = await fetch('http://localhost:4000/upload', { // REST endpoint for file upload
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                return result.fileUrl; // Assuming the endpoint returns the URL of the uploaded file
            } else {
                console.error('Failed to upload logo');
                setError("Logo upload failed. Please try again.");
                return null;
            }
        } catch (err) {
            console.error('Error during logo upload:', err);
            setError("An error occurred while uploading the logo.");
            return null;
        }
    };

    const handleCreateParty = async (e) => {
        e.preventDefault();
        setLoading(true); // Start the loader

        try {
            // First, upload the logo if present
            const logoUrl = await handleLogoUpload();

            // Then, create the party with the logo URL (if uploaded)
            await createParty({
                variables: {
                    name: formData.name,
                    regNum: formData.regNum,
                    partyAbbrev: formData.partyAbbrev,
                    election: formData.selectedElection,
                    officeTel: formData.officeTel,
                    description: formData.description,
                    logo: logoUrl, // Pass the logo URL instead of the file
                },
            });
        } catch (err) {
            setLoading(false); // Stop the loader on error
        }
    };

    return (
        <div className="create-party-container">
            <form onSubmit={handleCreateParty} className="form">
                {error && <p className="error-message">{error}</p>}

                <div className="form-row">
                    <div className="form-column">
                        <label>
                            Party Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={loading} // Disable during loading
                            />
                        </label>
                    </div>
                    <div className="form-column">
                        <label>
                            Party Abbreviation:
                            <input
                                type="text"
                                name="partyAbbrev"
                                value={formData.partyAbbrev}
                                onChange={handleChange}
                                required
                                disabled={loading} // Disable during loading
                            />
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-column">
                        <label>
                            Registration Number:
                            <input
                                type="text"
                                name="regNum"
                                value={formData.regNum}
                                onChange={handleChange}
                                required
                                disabled={loading} // Disable during loading
                            />
                        </label>
                    </div>
                    <div className="form-column">
                        <label>
                            Office Telephone:
                            <input
                                type="text"
                                name="officeTel"
                                value={formData.officeTel}
                                onChange={handleChange}
                                required
                                disabled={loading} // Disable during loading
                            />
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-column">
                        <label>
                            Associated Election:
                            <select
                                name="selectedElection"
                                value={formData.selectedElection}
                                onChange={handleChange}
                                required
                                disabled={loading} // Disable during loading
                            >
                                <option value="">Select an Election</option>
                                {elections?.map((election) => (
                                    <option key={election.id} value={election.id}>
                                        {election.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="form-column">
                        <label>
                            Description (Optional):
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                disabled={loading} // Disable during loading
                            />
                        </label>
                    </div>
                </div>

                <label>Upload Party Logo (Optional):</label>
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setLogo(e.target.files[0])}
                    disabled={loading} // Disable during loading
                />

                <button type="submit" disabled={loading}> {/* Disable button during loading */}
                    {loading ? <Loader /> : 'Create Party'} {/* Show loader when loading */}
                </button>
            </form>
        </div>
    );
};

export default CreatePartyForm;
