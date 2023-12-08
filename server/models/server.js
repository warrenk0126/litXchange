const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  trades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trade' }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

module.exports = mongoose.model('User', UserSchema);