import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const SIGNUP_USER = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

function RegisterPage() {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [signup, { error }] = useMutation(SIGNUP_USER, {
    onCompleted({ addUser }) {
      localStorage.setItem('token', addUser.token);
      // Redirect user to home page or profile page
    }
  });

  const handleFormSubmit = event => {
    event.preventDefault();
    signup({ variables: { ...formState } });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={formState.username}
          onChange={event => setFormState({ ...formState, username: event.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formState.email}
          onChange={event => setFormState({ ...formState, email: event.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formState.password}
          onChange={event => setFormState({ ...formState, password: event.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error.message}</p>}
    </div>
  );
}

export default RegisterPage;
