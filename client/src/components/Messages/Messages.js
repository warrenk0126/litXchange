import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const SEND_MESSAGE = gql`
  mutation SendMessage($recipient: ID!, $content: String!) {
    sendMessage(recipient: $recipient, content: $content) {
      messageId
      sender {
        username
      }
      recipient {
        username
      }
      content
    }
  }
`;

function Messages({ recipient }) {
  const [formState, setFormState] = useState({ content: '' });
  const [sendMessage, { error }] = useMutation(SEND_MESSAGE);

  const handleFormSubmit = event => {
    event.preventDefault();
    sendMessage({ variables: { recipient: recipient.id, content: formState.content } });
    setFormState({ content: '' });
  };

  return (
    <div>
      <h1>Messages</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Type your message here"
          value={formState.content}
          onChange={event => setFormState({ content: event.target.value })}
        />
        <button type="submit">Send</button>
      </form>
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default Messages;
