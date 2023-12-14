import React, { useState, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import UserContext from '../UserContext';
import { Form, Input, Button, Rate } from 'antd';

const ADD_REVIEW = gql`
  mutation AddReview($reviewer: ID!, $reviewee: ID!, $rating: Int!, $content: String!) {
    addReview(reviewer: $reviewer, reviewee: $reviewee, rating: $rating, content: $content) {
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
`;

const ReviewForm = ({ revieweeId }) => {
  const { user } = useContext(UserContext);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  const [addReview] = useMutation(ADD_REVIEW);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addReview({ variables: { reviewer: user.id, reviewee: revieweeId, rating, content } });
    setRating(0);
    setContent('');
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item>
        <Rate value={rating} onChange={(value) => setRating(value)} required />
      </Form.Item>
      <Form.Item>
        <Input.TextArea value={content} onChange={(e) => setContent(e.target.value)} required />
      </Form.Item>
      <Form.Item>
        <Button type="submit">Leave Review</Button>
      </Form.Item>
    </Form>
  );
};

export default ReviewForm;