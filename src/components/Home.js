import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import UserContext from '../UserContext';
import { List, Card } from 'antd';

const GET_TRADES = gql`
  query GetTrades {
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
`;

const Home = () => {
  const { user } = useContext(UserContext);
  const { loading, error, data } = useQuery(GET_TRADES);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h1>Open Trade Offers</h1>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 3,
        }}
        dataSource={data.trades}
        renderItem={trade => (
          <List.Item
            key={trade.id}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              title={<a href={`/trades/${trade.id}`}>{trade.bookRequested.title} for {trade.bookOffered.title}</a>}
              description={`Requested by: ${trade.requester.username}`}
            />
            Offered by: {trade.responder.username}
            <br/>
            Status: {trade.status}
          </List.Item>
        )}
      />
    </div>
  );
};

export default Home;