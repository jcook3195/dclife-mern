const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SiteAdminSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = SiteAdmin = mongoose.model('siteAdmin', SiteAdminSchema);
