import React from "react";

const SettingElectionManagement = () => {
    return (
        <div className="settings-section">
            <h2>Election Management</h2>
            <button>Add New Election</button>
            <div className="election-list">
                <ul>
                    <li>Election 1 <button>Edit</button> <button>Remove</button></li>
                    <li>Election 2 <button>Edit</button> <button>Remove</button></li>
                    {/* Add more elections dynamically */}
                </ul>
            </div>
        </div>
    );
};

export default SettingElectionManagement;
