import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import UserContext from '../UserContext';
import { List, Rate } from 'antd';

const GET_USER_REVIEWS = gql`
  query GetUserReviews($userId: ID!) {
    user(id: $userId) {
      id
      reviews {
        id
        reviewer {
          id
          username
        }
        reviewee {
          id
          username
        }
        rating
        content
      }
    }
  }
`;

const Reviews = () => {
  const { user } = useContext(UserContext);
  const { loading, error, data } = useQuery(GET_USER_REVIEWS, {
    variables: { userId: user.id },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h1>Your Reviews</h1>
      <List
        itemLayout="horizontal"
        dataSource={data.user.reviews}
        renderItem={review => (
          <List.Item>
            <List.Item.Meta
              title={`From: ${review.reviewer.username}, Rating: `}
              description={review.content}
            />
            <Rate disabled defaultValue={review.rating} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Reviews;