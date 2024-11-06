import React from "react";

const UserManagement = () => {
    return (
        <div className="settings-section">
            <h2>User Management</h2>
            <div className="user-list">
                {/* Here you can map over your users and display them */}
                <ul>
                    <li>User 1 <button>Edit</button> <button>Remove</button></li>
                    <li>User 2 <button>Edit</button> <button>Remove</button></li>
                    {/* Add more users dynamically */}
                </ul>
            </div>
            <button>Add New User</button>
        </div>
    );
};

export default UserManagement;
