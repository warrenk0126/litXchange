import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const UPDATE_BOOK = gql`
  mutation UpdateBook($bookId: ID!, $authors: [String]!, $description: String!, $title: String!, $image: String!, $link: String!) {
    updateBook(bookId: $bookId, authors: $authors, description: $description, title: $title, image: $image, link: $link) {
      bookId
      authors
      description
      title
      image
      link
    }
  }
`;

function EditBook({ book }) {
  const [formState, setFormState] = useState({ authors: book.authors, description: book.description, title: book.title, image: book.image, link: book.link });
  const [updateBook, { error }] = useMutation(UPDATE_BOOK);

  const handleFormSubmit = event => {
    event.preventDefault();
    updateBook({ variables: { bookId: book.bookId, ...formState } });
  };

  return (
    <div>
      <h1>Edit Book</h1>
      <form onSubmit={handleFormSubmit}>
        {/* Add form fields for book details here */}
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default EditBook;
