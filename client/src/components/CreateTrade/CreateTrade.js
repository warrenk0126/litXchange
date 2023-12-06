import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_TRADE = gql`
  mutation AddTrade($requestor: ID!, $responder: ID!, $requestedBook: ID!, $respondedBook: ID!, $status: String!) {
    addTrade(requestor: $requestor, responder: $responder, requestedBook: $requestedBook, respondedBook: $respondedBook, status: $status) {
      tradeId
      requestor {
        username
      }
      responder {
        username
      }
      requestedBook {
        title
      }
      respondedBook {
        title
      }
      status
    }
  }
`;

function CreateTrade() {
  const [formState, setFormState] = useState({ requestor: '', responder: '', requestedBook: '', respondedBook: '', status: '' });
  const [addTrade, { error }] = useMutation(ADD_TRADE);

  const handleFormSubmit = event => {
    event.preventDefault();
    addTrade({ variables: { ...formState } });
  };

  return (
    <div>
      <h1>Add a Trade</h1>
      <form onSubmit={handleFormSubmit}>
        {/* Add form fields for trade details here */}
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default CreateTrade;
