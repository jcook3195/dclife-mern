const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BusinessSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  businessName: {
    type: String,
    required: true,
  },
  businessCategory: {
    type: Schema.Types.ObjectId,
    ref: 'businessCategory',
  },
  businessMainImage: {
    type: String,
  },
  about: {
    type: String,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
  },
  websiteUrl: {
    type: String,
  },
  social: {
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
    youtube: {
      type: String,
    },
    pinterest: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    snapchat: {
      type: String,
    },
  },
  additionalImages: [
    {
      image: {
        type: String,
      },
    },
  ],
  favorites: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      review: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Business = mongoose.model('business', BusinessSchema);
