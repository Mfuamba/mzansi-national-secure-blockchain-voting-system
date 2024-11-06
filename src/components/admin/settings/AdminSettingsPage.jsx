import React, { useState } from "react";
import GeneralSettings from "./GeneralSettings";
import UserManagement from "./UserManagement";
import SettingElectionManagement from "./SettingElectionManagement";
import SecuritySettings from "./SecuritySettings";
import NotificationSettings from "./NotificationSettings";
import '../styles/AdminSettingsPage.css';

const AdminSettingsPage = () => {
    const [activeTab, setActiveTab] = useState("general");

    const renderContent = () => {
        switch (activeTab) {
            case "general":
                return <GeneralSettings />;
            case "users":
                return <UserManagement />;
            case "elections":
                return <SettingElectionManagement />;
            case "security":
                return <SecuritySettings />;
            case "notifications":
                return <NotificationSettings />;
            default:
                return <GeneralSettings />;
        }
    };

    return (
        <div className="settings-page-container">
            <div className="settings-tabs">
                {["general", "users", "elections", "security", "notifications"].map((tab) => (
                    <div 
                        key={tab}
                        onClick={() => setActiveTab(tab)} 
                        className={`tab ${activeTab === tab ? "active" : ""}`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
                    </div>
                ))}
            </div>
            <div className="settings-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminSettingsPage;
