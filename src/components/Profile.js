import React, { useState, useContext } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import UserContext from '../UserContext';
import { Form, Input, Button, Card, List } from 'antd';

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
      email
      books {
        id
        title
        author
        genre
        condition
      }
      // Add other fields as needed
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $username: String!, $email: String!) {
    updateUser(id: $id, username: $username, email: $email) {
      id
      username
      email
      // Add other fields as needed
    }
  }
`;

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $genre: String!, $condition: String!, $owner: ID!) {
    addBook(title: $title, author: $author, genre: $genre, condition: $condition, owner: $owner) {
      id
      title
      author
      genre
      condition
    }
  }
`;

const REMOVE_BOOK = gql`
  mutation RemoveBook($id: ID!) {
    removeBook(id: $id) {
      id
    }
  }
`;

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: user.id },
  });

  const [updateUser] = useMutation(UPDATE_USER);
  const [addBook] = useMutation(ADD_BOOK);
  const [removeBook] = useMutation(REMOVE_BOOK);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await updateUser({ variables: { id: user.id, username, email } });
    setUser(response.data.updateUser);
  };

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h1>Your Profile</h1>
      <Form
        name="profile"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Profile
          </Button>
        </Form.Item>
      </Form>

      <h2>Your Books</h2>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data.user.books}
        renderItem={book => (
          <List.Item>
            <Card title={book.title}>
              {book.author}<br/>
              {book.genre}<br/>
              {book.condition}
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Profile;