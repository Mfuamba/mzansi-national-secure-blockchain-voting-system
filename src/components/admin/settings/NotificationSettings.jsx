import React from "react";

const NotificationSettings = () => {
    return (
        <div className="settings-section">
            <h2>Notification Settings</h2>
            <form>
                <div className="form-group">
                    <label>Email Notifications:</label>
                    <input type="checkbox" />
                </div>
                <div className="form-group">
                    <label>SMS Notifications:</label>
                    <input type="checkbox" />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default NotificationSettings;
