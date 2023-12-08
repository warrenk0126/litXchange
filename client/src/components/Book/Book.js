import React from 'react';
import { useMutation, gql } from '@apollo/client';

const REQUEST_TRADE = gql`
  mutation RequestTrade($bookId: ID!) {
    requestTrade(bookId: $bookId) {
      tradeId
    }
  }
`;

function Book({ book }) {
  const [requestTrade, { error }] = useMutation(REQUEST_TRADE);

  const handleRequestTrade = () => {
    requestTrade({ variables: { bookId: book.bookId } });
  };

  return (
    <div>
      <h2>{book.title}</h2>
      <h3>Authors: {book.authors.join(', ')}</h3>
      <p>{book.description}</p>
      <img src={book.image} alt={book.title} />
      <a href={book.link}>More Info</a>
      <button onClick={handleRequestTrade}>Request Trade</button>
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default Book;
