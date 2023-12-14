const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: String, // This will be the ID of the user sending the message
  receiver: String, // This will be the ID of the user receiving the message
  content: String,
  trade: String // This will be the ID of the trade the message is associated with
});

module.exports = mongoose.model('Message', messageSchema);