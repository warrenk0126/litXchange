import React from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Form, Button } from 'antd';

const stripePromise = loadStripe('pk_test_51ON0y0Hg3AU6iOyR9xwdGbtmZQKXxSyAvCctZ1ptbC3hetNoQ3vFVAnKBg40HYE6l3owr9Qw70vJqAER1cTAACLT00jfwgvOoe');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // You'll need to replace this with the actual payment processing code
    console.log('Payment processing not implemented yet');
  };

  return (
    <Form onFinish={handleSubmit}>
      <CardElement />
      <Button type="primary" htmlType="submit">Donate</Button>
    </Form>
  );
};

const Donations = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Donations;