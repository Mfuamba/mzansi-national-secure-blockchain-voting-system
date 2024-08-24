// src/apolloClient.js

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: createHttpLink({
        uri: 'http://localhost:4000/graphql',  // Replace with your GraphQL endpoint
    }),
    cache: new InMemoryCache(),
});

export default client;
