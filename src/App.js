import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import IDVerification from './components/common/IDVerification';
import LoginForm from './components/common/LoginForm';
import VoterRegistration from './components/user/VoterRegistration';
import VoterDashboard from './components/user/VoterOverview';
import AdminDashboard from './components/admin/home/AdminOverview';
import SignupForm from './components/common/SignupForm';
import VoterLayout from './layouts/voterLayout';
import MultiStepForm from './components/common/MultiStepForm';
import PrivateRoute from './utils/PrivateRoute';  // Import the PrivateRoute component
import PublicRoute from './utils/PublicRoute';    // Import the PublicRoute component
import AdminLogin from './components/admin/AdminLogin'; // Import admin login component
import AdminSignup from './components/admin/AdminSignup'; // Import admin signup component
import AdminLayout from './layouts/adminLayout';
import ElectionManagement from './components/admin/electionmanagement/ElectionManagement';
//import PartyOverview from './components/admin/party/PartyOverview';
import PartyManagement from './components/admin/party/PartyManagement';
//import CandidateOverview from './components/admin/candidateman/CandOverview';
import CandidateManagement from './components/admin/candidateman/CandidateMangement';
import VoterManagement from './components/admin/voters/VoterManagement';
import AdminSettingsPage from './components/admin/settings/AdminSettingsPage';

function App() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Navigate to="/verify" />} />
            <Route path="/verify" element={<IDVerification />} />
            <Route path="/user/login" element={<PublicRoute><LoginForm /></PublicRoute>} />
            <Route path="/user/signup" element={<PublicRoute><SignupForm /></PublicRoute>} />
            <Route path="/voter/register" element={<VoterRegistration />} />
            <Route path="/admin/login" element={<PublicRoute><AdminLogin /></PublicRoute>} />
            <Route path="/admin/signup" element={<PublicRoute><AdminSignup /></PublicRoute>} />

            {/* Private routes */}
            <Route path="/voter/dashboard" element={
                <PrivateRoute role="VOTER">
                    <VoterLayout>
                        <VoterDashboard />
                    </VoterLayout>
                </PrivateRoute>
            } />
            
            <Route path="/admin/dashboard" element={
                <PrivateRoute role="ADMIN">
                    <AdminLayout>
                        <AdminDashboard />
                    </AdminLayout>
                </PrivateRoute>
            } />
            <Route path="/admin/elecmanagement" element={
                <PrivateRoute role="ADMIN">
                    <AdminLayout>
                        <ElectionManagement />
                    </AdminLayout>
                </PrivateRoute>
            } />
            <Route path="/admin/partymanagement" element={
                <PrivateRoute role="ADMIN">
                    <AdminLayout>
                        <PartyManagement />
                    </AdminLayout>
                </PrivateRoute>
            } />
            <Route path="/admin/candmanagement" element={
                <PrivateRoute role="ADMIN">
                    <AdminLayout>
                        <CandidateManagement />
                    </AdminLayout>
                </PrivateRoute>
            } />
            <Route path="/admin/voters" element={
                <PrivateRoute role="ADMIN">
                    <AdminLayout>
                        <VoterManagement />
                    </AdminLayout>
                </PrivateRoute>
            } />
            <Route path="/admin/settings" element={
                <PrivateRoute role="ADMIN">
                    <AdminLayout>
                        <AdminSettingsPage />
                    </AdminLayout>
                </PrivateRoute>
            } />
            <Route path="/voter/profile-setup" element={<MultiStepForm />} />
        </Routes>
    );
}

export default App;
