const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
  },
  business: {
    type: Schema.Types.ObjectId,
  },
  stars: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  businessReply: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Review = mongoose.model('review', ReviewSchema);
