import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import UserContext from './UserContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Trades from './components/Trades';
import Donations from './components/Donations';
import Login from './components/Login';
import Signup from './components/Signup';

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
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
            <Route path="/profile/:id" element={!user ? <Navigate to="/login" /> : <Profile />} />
            <Route path="/trades" element={!user ? <Navigate to="/login" /> : <Trades />} />
            <Route path="/donations" element={!user ? <Navigate to="/login" /> : <Donations />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </ApolloProvider>
  );
};

export default App;