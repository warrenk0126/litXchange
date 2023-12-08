import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_REVIEW = gql`
  mutation AddReview($userId: ID!, $rating: Int!, $review: String!) {
    addReview(userId: $userId, rating: $rating, review: $review) {
      reviewId
      user {
        username
      }
      rating
      review
    }
  }
`;

function RatingsAndReviews({ user }) {
  const [formState, setFormState] = useState({ rating: 0, review: '' });
  const [addReview, { error }] = useMutation(ADD_REVIEW);

  const handleFormSubmit = event => {
    event.preventDefault();
    addReview({ variables: { userId: user.id, ...formState } });
    setFormState({ rating: 0, review: '' });
  };

  return (
    <div>
      <h1>Ratings and Reviews</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="number"
          min="1"
          max="5"
          placeholder="Rating (1-5)"
          value={formState.rating}
          onChange={event => setFormState({ ...formState, rating: parseInt(event.target.value) })}
        />
        <textarea
          placeholder="Write your review here"
          value={formState.review}
          onChange={event => setFormState({ ...formState, review: event.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default RatingsAndReviews;
