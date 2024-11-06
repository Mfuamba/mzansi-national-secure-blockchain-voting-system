import { ApolloLink, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';

const authLink = new ApolloLink((operation, forward) => {
    const tokenData = localStorage.getItem('token'); // Retrieve the token from local storage

    operation.setContext({
        headers: {
            authorization: tokenData ? `Bearer ${tokenData}` : "",
        },
    });
    return forward(operation);
});

const httpLink = new HttpLink({ 
    uri: "http://localhost:4000/graphql",
    credentials: 'include', // You may choose to keep this if you're using credentials elsewhere
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
