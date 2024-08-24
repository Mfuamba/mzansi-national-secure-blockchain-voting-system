import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/apolloClient';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import IDVerification from './components/common/IDVerification';
import LoginForm from './components/common/LoginForm';
import VoterRegistration from './components/user/VoterRegistration';
import VoterDashboard from './components/user/VoterDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import SignupForm from './components/common/SignupForm';

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/verify" />} />
                    <Route path="/verify" element={<IDVerification />} />
                    <Route path="/user/login" element={<LoginForm />} />
                    <Route path="/user/signup" element={<SignupForm />} />
                    <Route path="/voter/register" element={<VoterRegistration />} />
                    <Route path="/voter/dashboard" element={<VoterDashboard />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Routes>
            </Router>
        </ApolloProvider>
    );
}

export default App;
