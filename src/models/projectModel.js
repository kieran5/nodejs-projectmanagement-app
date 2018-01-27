var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please enter a name for the project.'
  },
  creator: {
    type: String,
    required: 'Please enter your name as the creator of this project.'
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
