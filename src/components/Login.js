import React, { useState, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import UserContext from '../UserContext';
import { Form, Input, Button } from 'antd';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      token
    }
  }
`;

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [login, { loading, error, data }] = useMutation(LOGIN);

  const onFinish = async (values) => {
    try {
      const response = await login({ variables: { email: values.email, password: values.password } });
      localStorage.setItem('token', response.data.login.token);
      setUser(response.data.login);
      setErrorMessage(''); // Clear any previous error messages
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  if (loading) return 'Loading...';

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
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
          Log In
        </Button>
        {errorMessage && <p>{errorMessage}</p>}
      </Form.Item>
    </Form>
  );
};

export default Login;