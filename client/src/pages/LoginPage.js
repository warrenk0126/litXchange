import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const LOGIN_USER = gql`
  mutation Login(: String!, : String!) {
    login(email: , password: ) {
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
  const history = useHistory();
  const [login, { error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      const decoded = jwt_decode(login.token);
      localStorage.setItem('token', login.token);
      history.push(`/profile/${decoded.user.id}`);
    }
  });

  const handleFormSubmit = event => {
    event.preventDefault();
    login({ variables: { ...formState } });
  };

  return (
    <div>
      <h1>Login to LitXchange</h1>
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