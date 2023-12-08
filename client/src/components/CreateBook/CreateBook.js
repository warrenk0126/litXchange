import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_BOOK = gql`
  mutation AddBook($authors: [String]!, $description: String!, $title: String!, $image: String!, $link: String!) {
    addBook(authors: $authors, description: $description, title: $title, image: $image, link: $link) {
      bookId
      authors
      description
      title
      image
      link
    }
  }
`;

function CreateBook() {
  const [formState, setFormState] = useState({ authors: [], description: '', title: '', image: '', link: '' });
  const [addBook, { error }] = useMutation(ADD_BOOK);

  const handleFormSubmit = event => {
    event.preventDefault();
    addBook({ variables: { ...formState } });
  };

  return (
    <div>
      <h1>Add a Book</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={formState.title}
          onChange={event => setFormState({ ...formState, title: event.target.value })}
        />
        <input
          type="text"
          placeholder="Authors"
          value={formState.authors}
          onChange={event => setFormState({ ...formState, authors: event.target.value.split(',') })}
        />
        <textarea
          placeholder="Description"
          value={formState.description}
          onChange={event => setFormState({ ...formState, description: event.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formState.image}
          onChange={event => setFormState({ ...formState, image: event.target.value })}
        />
        <input
          type="text"
          placeholder="Link"
          value={formState.link}
          onChange={event => setFormState({ ...formState, link: event.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default CreateBook;
