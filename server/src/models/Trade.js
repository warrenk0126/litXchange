const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
  requestor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  responder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  requestedBook: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  respondedBook: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Trade = mongoose.model('Trade', TradeSchema);

module.exports = Trade;
