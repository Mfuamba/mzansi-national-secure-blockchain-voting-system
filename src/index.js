import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import AuthProvider from './utils/AuthContext';
import client from './apollo/apolloClient'; // Import the configured client from apolloClient.js

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
