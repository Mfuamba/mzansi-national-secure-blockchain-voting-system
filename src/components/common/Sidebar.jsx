import React, { useContext } from 'react'; // Import useContext
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext } from '../../utils/AuthContext'; // Import AuthContext
import '../../styles/Sidebar.css';
import logo from '../../assets/iec-logo.png';
import { FaHome, FaVoteYea, FaHistory, FaUserAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
    const { logout } = useContext(AuthContext); // Access logout function from AuthContext
    const navigate = useNavigate(); // For programmatic navigation

    const handleSignOut = () => {
        logout(); // Call logout function from AuthContext
        navigate('/user/login'); // Redirect to login page
    };

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <img src={logo} alt="IEC Logo" />
            </div>
            <nav className="sidebar-nav">
                <div className="sidebar-section">
                    <h4>GENERAL</h4>
                    <NavLink to="/voter/dashboard" activeClassName="active">
                        <FaHome /> Home
                    </NavLink>
                    <NavLink to="/voter/elections" activeClassName="active">
                        <FaVoteYea /> Ongoing Elections
                    </NavLink>
                    <NavLink to="/voter/history" activeClassName="active">
                        <FaHistory /> Vote History
                    </NavLink>
                </div>
                <div className="sidebar-section">
                    <h4>ACCOUNT</h4>
                    <NavLink to="/voter/profile-setup" activeClassName="active">
                        <FaUserAlt /> Profile
                    </NavLink>
                    <NavLink to="/voter/settings" activeClassName="active">
                        <FaCog /> Settings
                    </NavLink>
                    <button onClick={handleSignOut} className="sidebar-signout">
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
