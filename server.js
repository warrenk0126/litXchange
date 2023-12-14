require('dotenv').config()
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./server/Schema');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const jwt = require('jsonwebtoken');
const User = require('./server/User');
const mongoose = require('mongoose');

const app = express();

// Middleware to check JWT
app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = user;
    } catch (err) {
      console.log(err);
    }
  }
  next();
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

// Stripe endpoint for creating a payment intent
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd'
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

// Stripe endpoint for handling webhook events
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    console.log('PaymentIntent was successful!');
    // Here you can fulfill the order
  }

  res.json({ received: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Running on Port ${port}`));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('Connected to database');
});