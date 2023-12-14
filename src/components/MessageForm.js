import React, { useState, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import UserContext from '../UserContext';
import { Form, Input, Button } from 'antd';

const ADD_MESSAGE = gql`
  mutation AddMessage($sender: ID!, $receiver: ID!, $content: String!, $trade: ID!) {
    addMessage(sender: $sender, receiver: $receiver, content: $content, trade: $trade) {
      id
      sender {
        id
        username
      }
      receiver {
        id
        username
      }
      content
      trade {
        id
      }
    }
  }
`;

const MessageForm = ({ receiverId, tradeId }) => {
  const { user } = useContext(UserContext);
  const [content, setContent] = useState('');

  const [addMessage] = useMutation(ADD_MESSAGE);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addMessage({ variables: { sender: user.id, receiver: receiverId, content, trade: tradeId } });
    setContent('');
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item>
        <Input.TextArea value={content} onChange={(e) => setContent(e.target.value)} required />
      </Form.Item>
      <Form.Item>
        <Button type="submit">Send Message</Button>
      </Form.Item>
    </Form>
  );
};

export default MessageForm;