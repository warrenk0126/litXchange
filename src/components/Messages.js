import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import UserContext from '../UserContext';

const GET_USER_MESSAGES = gql`
  query GetUserMessages($userId: ID!) {
    user(id: $userId) {
      id
      messages {
        id
        sender {
          id
          username
        }
        receiver {
          id
          username
        }
        content
        trade {
          id
        }
      }
    }
  }
`;

const Messages = () => {
  const { user } = useContext(UserContext);
  const { loading, error, data } = useQuery(GET_USER_MESSAGES, {
    variables: { userId: user.id },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h1>Your Messages</h1>
      {data.user.messages.map(message => (
        <div key={message.id}>
          <h3>From: {message.sender.username}</h3>
          <h3>To: {message.receiver.username}</h3>
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Messages;