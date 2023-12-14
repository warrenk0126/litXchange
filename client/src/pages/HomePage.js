
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';

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

function Home() {
  const [books, setBooks] = useState([]);
  const { loading, error, data } = useQuery(GET_BOOKS);

  useEffect(() => {
    if (data) {
      setBooks(data.books);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Book List</h1>
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
      <Link to="/add" className="btn btn-primary mb-3">
        Add Book
      </Link>
      <Row>
        <Col md={8}>
          <ListGroup as="ul">
            {books.map((book) => (
              <ListGroup.Item key={book.bookId}>
                <Link to={`/book/${book.bookId}`} className="text-decoration-none">
                  <h3>{book.title}</h3>
                  <p>
                    By {book.authors.join(', ')} | {book.description}
                  </p>
                  <Image src={book.image} fluid rounded />
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <h3>Add Book</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter title"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="authors" className="form-label">
                Authors
              </label>
              <input
                type="text"
                className="form-control"
                id="authors"
                placeholder="Enter authors"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="Enter description"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image URL
              </label>
              <input
                type="text"
                className="form-control"
                id="image"
                placeholder="Enter image URL"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="link" className="form-label">
                Link
              </label>
              <input
                type="text"
                className="form-control"
                id="link"
                placeholder="Enter link"
              />
            </div>
            <Button type="submit" className="btn btn-primary">
              Add
            </Button>
          </form>
        </Col>
      </Row>
    </div>
  );
}

export default Home;


