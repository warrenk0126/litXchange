import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

function LoginPage() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      localStorage.setItem('token', login.token);
      // Redirect user to home page or profile page
    }
  });

  const handleFormSubmit = event => {
    event.preventDefault();
    login({ variables: { ...formState } });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleFormSubmit}>
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

export default LoginPage;
