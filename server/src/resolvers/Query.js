const { User, Book, Trade } = require('../models');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('books')
          .populate('trades');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find().select('-__v -password');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).select('-__v -password');
    },
    books: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Book.find(params);
    },
    book: async (parent, { bookId }) => {
      return Book.findOne({ _id: bookId });
    },
    trades: async () => {
      return Trade.find();
    },
    trade: async (parent, { tradeId }) => {
      return Trade.findOne({ _id: tradeId });
    },
  },
};

module.exports = resolvers;
