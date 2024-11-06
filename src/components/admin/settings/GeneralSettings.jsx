import React from "react";

const GeneralSettings = () => {
    return (
        <div className="settings-section">
            <h2>General Settings</h2>
            <form>
                <div className="form-group">
                    <label>Application Name:</label>
                    <input type="text" placeholder="Enter app name" />
                </div>
                <div className="form-group">
                    <label>Language:</label>
                    <select>
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Timezone:</label>
                    <select>
                        <option value="UTC">UTC</option>
                        <option value="GMT">GMT</option>
                        <option value="CET">CET</option>
                    </select>
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default GeneralSettings;
