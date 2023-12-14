import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import client from './apolloClient';
import SignUp from './components/SignUp'; // Import the SignUp component

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/signup" component={SignUp} /> {/* Add a route for SignUp */}
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);