import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import client from './apolloClient';
import Signup from './components/Signup';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);