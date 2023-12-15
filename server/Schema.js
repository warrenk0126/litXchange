const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
} = require('graphql');
const mongoose = require('mongoose');
const User = require('./User');
const Book = require('./Book');
const Trade = require('./Trade');
const Message = require('./Message');
const Review = require('./Review');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ owner: parent.id });
      },
    },
    trades: {
      type: new GraphQLList(TradeType),
      resolve(parent, args) {
        return Trade.find({ $or: [{ requester: parent.id }, { responder: parent.id }] });
      },
    },
    messages: {
      type: new GraphQLList(MessageType),
      resolve(parent, args) {
        return Message.find({ $or: [{ sender: parent.id }, { receiver: parent.id }] });
      },
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parent, args) {
        return Review.find({ $or: [{ reviewer: parent.id }, { reviewee: parent.id }] });
      },
    },
  }),
});

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    genre: { type: GraphQLString },
    condition: { type: GraphQLString },
    owner: { 
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.owner);
      }
    }
  }),
});

const TradeType = new GraphQLObjectType({
  name: 'Trade',
  fields: () => ({
    id: { type: GraphQLID },
    bookRequested: { 
      type: BookType,
      resolve(parent, args) {
        return Book.findById(parent.bookRequested);
      }
    },
    bookOffered: { 
      type: BookType,
      resolve(parent, args) {
        return Book.findById(parent.bookOffered);
      }
    },
    requester: { 
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.requester);
      }
    },
    responder: { 
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.responder);
      }
    },
    status: { type: GraphQLString },
  }),
});

const MessageType = new GraphQLObjectType({
  name: 'Message',
  fields: () => ({
    id: { type: GraphQLID },
    sender: { 
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.sender);
      }
    },
    receiver: { 
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.receiver);
      }
    },
    content: { type: GraphQLString },
    trade: { 
      type: TradeType,
      resolve(parent, args) {
        return Trade.findById(parent.trade);
      }
    },
  }),
});

const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    id: { type: GraphQLID },
    reviewer: { 
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.reviewer);
      }
    },
    reviewee: { 
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.reviewee);
      }
    },
    rating: { type: GraphQLInt },
    content: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    // define other root queries as needed
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        let user = new User({
          username: args.username,
          email: args.email,
          password: args.password,
        });
        return user.save();
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(args.id, {
          username: args.username,
          email: args.email,
          password: args.password,
        });
      },
    },
    addBook: {
      type: BookType,
      args: {
        title: { type: GraphQLString },
        author: { type: GraphQLString },
        genre: { type: GraphQLString },
        condition: { type: GraphQLString },
        owner: { type: GraphQLID },
      },
      resolve(parent, args) {
        let book = new Book({
          title: args.title,
          author: args.author,
          genre: args.genre,
          condition: args.condition,
          owner: args.owner,
        });
        return book.save();
      },
    },
    removeBook: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Book.findByIdAndRemove(args.id);
      },
    },
    addTrade: {
      type: TradeType,
      args: {
        bookRequested: { type: GraphQLID },
        bookOffered: { type: GraphQLID },
        requester: { type: GraphQLID },
        responder: { type: GraphQLID },
        status: { type: GraphQLString },
      },
      resolve(parent, args) {
        let trade = new Trade({
          bookRequested: args.bookRequested,
          bookOffered: args.bookOffered,
          requester: args.requester,
          responder: args.responder,
          status: args.status,
        });
        return trade.save();
      },
    },
    updateTrade: {
      type: TradeType,
      args: {
        id: { type: GraphQLID },
        status: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Trade.findByIdAndUpdate(args.id, {
          status: args.status,
        });
      },
    },
    addMessage: {
      type: MessageType,
      args: {
        sender: { type: GraphQLID },
        receiver: { type: GraphQLID },
        content: { type: GraphQLString },
        trade: { type: GraphQLID },
      },
      resolve(parent, args) {
        let message = new Message({
          sender: args.sender,
          receiver: args.receiver,
          content: args.content,
          trade: args.trade,
        });
        return message.save();
      },
    },
    addReview: {
      type: ReviewType,
      args: {
        reviewer: { type: GraphQLID },
        reviewee: { type: GraphQLID },
        rating: { type: GraphQLInt },
        content: { type: GraphQLString },
      },
      resolve(parent, args) {
        let review = new Review({
          reviewer: args.reviewer,
          reviewee: args.reviewee,
          rating: args.rating,
          content: args.content,
        });
        return review.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});