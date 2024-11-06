// VoterOverview.jsx
import React from 'react';

const VoterOverview = ({ voters }) => {
    if (voters.length === 0) {
        return <p>No voters available</p>;
    }

    return (
        <div className="voter-overview">
            <h3>Registered Voters</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID Number</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {voters.map((voter) => (
                        <tr key={voter.idNumber}>
                            <td>{voter.idNumber}</td>
                            <td>{voter.name}</td>
                            <td>{voter.surname}</td>
                            <td>{voter.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VoterOverview;
