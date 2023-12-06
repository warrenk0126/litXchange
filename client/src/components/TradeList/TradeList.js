import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Trade from '../Trade/Trade';

const GET_TRADES = gql`
  query GetTrades {
    trades {
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

function TradeList() {
  const { loading, error, data } = useQuery(GET_TRADES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.trades.map((trade) => (
    <Trade key={trade.tradeId} trade={trade} />
  ));
}

export default TradeList;
