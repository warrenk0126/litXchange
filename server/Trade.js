const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeSchema = new Schema({
  bookRequested: String, // This will be the ID of the book being requested
  bookOffered: String, // This will be the ID of the book being offered
  requester: String, // This will be the ID of the user making the request
  responder: String, // This will be the ID of the user responding to the request
  status: String
});

module.exports = mongoose.model('Trade', tradeSchema);