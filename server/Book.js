const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  author: String,
  genre: String,
  condition: String,
  owner: String // This will be the ID of the user who owns the book
});

module.exports = mongoose.model('Book', bookSchema);