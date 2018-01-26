var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  name: String,
  creator: String,
});

module.exports = mongoose.model('Project', ProjectSchema);
