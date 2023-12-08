import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_USER_PROFILE = gql`
  query GetUserProfile($username: String!) {
    user(username: $username) {
      username
      savedBooks {
        bookId
        title
      }
      trades {
        tradeId
        requestedBook {
          title
        }
        respondedBook {
          title
        }
        status
      }
    }
  }
`;

function UserProfile({ username }) {
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { username },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>{data.user.username}'s Profile</h1>
      <h2>Books:</h2>
      {data.user.savedBooks.map((book) => (
        <p key={book.bookId}>{book.title}</p>
      ))}
      <h2>Trades:</h2>
      {data.user.trades.map((trade) => (
        <p key={trade.tradeId}>
          Requested: {trade.requestedBook.title}, Responded: {trade.respondedBook.title}, Status: {trade.status}
        </p>
      ))}
    </div>
  );
}

export default UserProfile;
