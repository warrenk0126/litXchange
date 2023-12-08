import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div>
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
      </div>
    </Router>
  );
}

export default App;
