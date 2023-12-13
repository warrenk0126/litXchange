import React from 'react';

function HomePage() {
  return (
    <div>
      <h1>Welcome to Book Exchange</h1>
      <p>Trade books with other users!</p>
      <h2>How to Use</h2>
      <p> 
        <ul>
          <li>Find all of the books you own</li>
          <li>Explore the books that you'd like to add to your own library</li>
          <li>Trade books with other users</li>
          <li>View statistics about your library</li>
          <li>Happy Reading!</li>
        </ul>
      </p>
      <HomePageForm />
      <HomePageList />
      <HomePageStats />
    </div>
  );
}

export default HomePage;
