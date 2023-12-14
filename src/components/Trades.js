import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import UserContext from '../UserContext';
import { Table } from 'antd';

const GET_USER_TRADES = gql`
  query GetUserTrades($userId: ID!) {
    user(id: $userId) {
      id
      trades {
        id
        bookRequested {
          id
          title
        }
        bookOffered {
          id
          title
        }
        requester {
          id
          username
        }
        responder {
          id
          username
        }
        status
      }
    }
  }
`;

const Trades = () => {
  const { user } = useContext(UserContext);
  const { loading, error, data } = useQuery(GET_USER_TRADES, {
    variables: { userId: user.id },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const columns = [
    { title: 'Book Requested', dataIndex: ['bookRequested', 'title'], key: 'bookRequested' },
    { title: 'Book Offered', dataIndex: ['bookOffered', 'title'], key: 'bookOffered' },
    { title: 'Requester', dataIndex: ['requester', 'username'], key: 'requester' },
    { title: 'Responder', dataIndex: ['responder', 'username'], key: 'responder' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
  ];

  return (
    <div>
      <h1>Your Trades</h1>
      <Table columns={columns} dataSource={data.user.trades} rowKey="id" />
    </div>
  );
};

export default Trades;