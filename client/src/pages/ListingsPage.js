import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { ListGroup } from 'react-bootstrap';
import './UserProfile.css';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";



<>const BookList = ({ books }) => {
  return (
    <ListGroup>
      {books.map((book, index) => (
        <ListGroup.Item key={index}>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
</>

export default BookList;
   
const addBook = () => {
    // Add a new book to the books array
   };
   
const deleteBook = () => {
    // Delete a book from the books array
   };
   
const updateBook = () => {
    // Update a book in the books array
   };

const App = () => {
const books = [
     { title: 'Book 1', author: 'Author 1' },
     { title: 'Book 2', author: 'Author 2' },
     // more books...
    ];
   
    return (
     <div className="container">
       <h1>Book Listings</h1>
       <BookList books={books} />
       <button onClick={() => addBook()}>Add Book</button>
       <button onClick={() => deleteBook()}>Delete Book</button>
       <button onClick={() => updateBook()}>Update Book</button>
     </div>
    );
   };
   
   export default App;