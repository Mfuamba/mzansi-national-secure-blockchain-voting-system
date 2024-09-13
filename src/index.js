import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css'; // Import the global styles
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import App from './App';
import AuthProvider from './utils/AuthContext'; // Import the AuthProvider

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',  // Point this to your backend's GraphQL endpoint
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router> {/* Wrap App in Router */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
