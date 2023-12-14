import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    }
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;