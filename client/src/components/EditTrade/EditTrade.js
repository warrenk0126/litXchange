import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const UPDATE_TRADE = gql`
  mutation UpdateTrade($tradeId: ID!, $requestor: ID!, $responder: ID!, $requestedBook: ID!, $respondedBook: ID!, $status: String!) {
    updateTrade(tradeId: $tradeId, requestor: $requestor, responder: $responder, requestedBook: $requestedBook, respondedBook: $respondedBook, status: $status) {
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

function EditTrade({ trade }) {
  const [formState, setFormState] = useState({ requestor: trade.requestor.id, responder: trade.responder.id, requestedBook: trade.requestedBook.bookId, respondedBook: trade.respondedBook.bookId, status: trade.status });
  const [updateTrade, { error }] = useMutation(UPDATE_TRADE);

  const handleFormSubmit = event => {
    event.preventDefault();
    updateTrade({ variables: { tradeId: trade.tradeId, ...formState } });
  };

  return (
    <div>
      <h1>Edit Trade</h1>
      <form onSubmit={handleFormSubmit}>
        {/* Add form fields for trade details here */}
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default EditTrade;
