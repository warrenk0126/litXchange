import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Book from '../Book/Book';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      bookId
      authors
      description
      title
      image
      link
    }
  }
`;

function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.books.map((book) => (
    <Book key={book.bookId} book={book} />
  ));
}

export default BookList;
