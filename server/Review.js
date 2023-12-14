const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  reviewer: String, // This will be the ID of the user leaving the review
  reviewee: String, // This will be the ID of the user being reviewed
  rating: Number,
  content: String
});

module.exports = mongoose.model('Review', reviewSchema);