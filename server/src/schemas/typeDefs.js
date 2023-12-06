const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Trade {
    tradeId: ID!
    requestor: User!
    responder: User!
    requestedBook: Book!
    respondedBook: Book!
    status: String!
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
    book(bookId: ID!): Book
    trades: [Trade]
    trade(tradeId: ID!): Trade
  }
`;

module.exports = typeDefs;
