var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var standupSchema = new Schema({
  memberName: { type: String, required: true },
  project: { type: String, required: true },
  workYesterday: { type: String, required: true },
  workToday: { type: String, required: true },
  impediment: { type: String, required: true, default: 'none' },
  createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Standup', standupSchema);
