import React from "react";

const SecuritySettings = () => {
    return (
        <div className="settings-section">
            <h2>Security Settings</h2>
            <form>
                <div className="form-group">
                    <label>Enable Two-Factor Authentication:</label>
                    <input type="checkbox" />
                </div>
                <div className="form-group">
                    <label>Password Strength:</label>
                    <select>
                        <option value="weak">Weak</option>
                        <option value="moderate">Moderate</option>
                        <option value="strong">Strong</option>
                    </select>
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default SecuritySettings;
