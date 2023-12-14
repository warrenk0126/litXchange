import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import UserContext from './UserContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Trades from './components/Trades';
import Donations from './components/Donations';
import Login from './components/Login';
import SignUp from './components/SignUp';

const App = () => {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Navbar />
          <button onClick={logout}>Log Out</button>
          <Switch>
            <Route path="/login">
              {user ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route path="/signup">
              {user ? <Redirect to="/" /> : <SignUp />}
            </Route>
            <Route path="/profile/:id">
              {!user ? <Redirect to="/login" /> : <Profile />}
            </Route>
            <Route path="/trades">
              {!user ? <Redirect to="/login" /> : <Trades />}
            </Route>
            <Route path="/donations">
              {!user ? <Redirect to="/login" /> : <Donations />}
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </ApolloProvider>
  );
};

export default App;