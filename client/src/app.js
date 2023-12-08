import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookList from './components/BookList/BookList';
import TradeList from './components/TradeList/TradeList';
import CreateBook from './components/CreateBook/CreateBook';
import CreateTrade from './components/CreateTrade/CreateTrade';
import EditBook from './components/EditBook/EditBook';
import EditTrade from './components/EditTrade/EditTrade';
import TradeMatches from './components/TradeMatches/TradeMatches';
import Navbar from './components/Navbar/Navbar';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/books" component={BookList} />
        <Route exact path="/trades" component={TradeList} />
        <Route exact path="/create-book" component={CreateBook} />
        <Route exact path="/create-trade" component={CreateTrade} />
        <Route exact path="/edit-book/:id" component={EditBook} />
        <Route exact path="/edit-trade/:id" component={EditTrade} />
        <Route exact path="/trade-matches" component={TradeMatches} />
      </Container>
    </Router>
  );
}

export default App;
