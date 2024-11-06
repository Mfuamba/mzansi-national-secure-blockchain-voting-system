import React, { useContext } from 'react'; // Import useContext
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext } from '../../utils/AuthContext'; // Import AuthContext
import '../admin/styles/AdminSidebar.css';
import logo from '../../assets/iec-logo.png';
import { FaHome, FaVoteYea, FaHistory, FaUserAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';

const AdminSidebar = () => {
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
                    <NavLink to="/admin/dashboard" activeClassName="active">
                        <FaHome /> Home
                    </NavLink>
                    <NavLink to="/admin/elections" activeClassName="active">
                        <FaVoteYea /> Ongoing Elections
                    </NavLink>
                </div>
                <div className="sidebar-section">
                    <h4>MANAGE</h4>
                    <NavLink to="/admin/voters" activeClassName="active">
                        <FaHome /> Voters
                    </NavLink>
                    <NavLink to="/admin/candmanagement" activeClassName="active">
                        <FaVoteYea /> Candidates
                    </NavLink>
                    <NavLink to="/admin/partymanagement" activeClassName="active">
                        <FaHistory /> Party Management
                    </NavLink>
                    <NavLink to="/admin/elecmanagement" activeClassName="active">
                        <FaHistory /> Election Management
                    </NavLink>
                </div>
                <div className="sidebar-section">
                    <h4>ACCOUNT</h4>
                    <NavLink to="/admin/profile-setup" activeClassName="active">
                        <FaUserAlt /> Profile
                    </NavLink>
                    <NavLink to="/admin/settings" activeClassName="active">
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

export default AdminSidebar;
