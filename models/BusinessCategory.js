const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BusinessCategorySchema = new Schema({
  category: {
    type: String,
    subcategories: [
      {
        subcategory: {
          type: String,
        },
      },
    ],
  },
});

module.exports = BusinessCategory = mongoose.model(
  'businessCategory',
  BusinessCategorySchema
);
