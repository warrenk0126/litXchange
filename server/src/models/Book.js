const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  authors: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
