import React, { useState, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import UserContext from '../UserContext';
import { Form, Input, Button } from 'antd';

const SIGN_UP = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      id
      username
      token
    }
  }
`;

const SignUp = () => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [signUp, { loading, error, data }] = useMutation(SIGN_UP);

  const onFinish = async (values) => {
    // Basic form validation
    if (values.username.length < 3) {
      setErrorMessage('Username must be at least 3 characters long');
      return;
    }
    if (!values.email.includes('@')) {
      setErrorMessage('Please enter a valid email');
      return;
    }
    if (values.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await signUp({ variables: { username: values.username, email: values.email, password: values.password } });
      localStorage.setItem('token', response.data.addUser.token);
      setUser(response.data.addUser);
      setErrorMessage(''); // Clear any previous error messages
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  if (loading) return 'Loading...';

  return (
    <Form
      name="signup"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
        {errorMessage && <p>{errorMessage}</p>}
      </Form.Item>
    </Form>
  );
};

export default SignUp;