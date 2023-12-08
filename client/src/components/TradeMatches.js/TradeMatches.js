import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_TRADE_MATCHES = gql`
  query GetTradeMatches {
    tradeMatches {
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

function TradeMatches() {
  const { loading, error, data } = useQuery(GET_TRADE_MATCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Your Trade Matches</h1>
      {data.tradeMatches.map((trade) => (
        <p key={trade.tradeId}>
          {trade.requestor.username} wants to trade {trade.requestedBook.title} with {trade.responder.username} for {trade.respondedBook.title}. Status: {trade.status}
        </p>
      ))}
    </div>
  );
}

export default TradeMatches;
