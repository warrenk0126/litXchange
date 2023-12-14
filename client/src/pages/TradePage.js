import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { jwt_decode } from 'jwt-decode';
import { Button, Form, Row, Col } from 'react-bootstrap';

const CREATE_TRADE = gql`
  mutation CreateTrade(
    : ID!
    : ID!
    : String!
  ) {
    createTrade(
      bookId: 
      userId: 
      tradeStatus: 
    ) {
      id
      book {
        id
        title
      }
      user {
        id
        username
      }
      tradeStatus
    }
  }
`;

function BookTradePage() {
  const [formState, setFormState] = useState({
    bookId: '',
    userId: '',
    tradeStatus: 'Requested'
  });
  const history = useHistory();
  const [createTrade, { error }] = useMutation(CREATE_TRADE, {
    onCompleted({ createTrade }) {
      history.push(`/book/${createTrade.book.id}`);
    }
  });

  const handleFormSubmit = event => {
    event.preventDefault();
    createTrade({ variables: { ...formState } });
  };

  return (
    <div>
      <h1>Book Trade</h1>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group as={Row} controlId="bookId">
          <Form.Label column sm="2">
            Book:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Book ID"
              value={formState.bookId}
              onChange={event => setFormState({ ...formState, bookId: event.target.value })}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="userId">
          <Form.Label column sm="2">
            User:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="User ID"
              value={formState.userId}
              onChange={event => setFormState({ ...formState, userId: event.target.value })}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="tradeStatus">
          <Form.Label column sm="2">
            Status:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              value={formState.tradeStatus}
              onChange={event => setFormState({ ...formState, tradeStatus: event.target.value })}
            >
              <option value="Requested">Requested</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default BookTradePage;