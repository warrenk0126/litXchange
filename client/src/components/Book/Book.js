import React from 'react';

function Book({ book }) {
  return (
    <div>
      <h2>{book.title}</h2>
      <h3>Authors: {book.authors.join(', ')}</h3>
      <p>{book.description}</p>
      <img src={book.image} alt={book.title} />
      <a href={book.link}>More Info</a>
    </div>
  );
}

export default Book;
