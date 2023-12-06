import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const logout = () => {
    localStorage.removeItem('token');
    // Redirect user to home page or login page
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/books">Books</Link>
      <Link to="/trades">Trades</Link>
      <Link to="/create-book">Add Book</Link>
      <Link to="/create-trade">Add Trade</Link>
      <button onClick={logout}>Logout</button>
      {/* Add more links as needed */}
    </nav>
  );
}

export default Navbar;
