import mongoose from 'mongoose';

// Creating Schema model for use in the controller
// We will use this to almost validate the data that is passed in by the user
// and restrict the incoming data to fit our Mongo database
export const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please enter a name for the project.'
  },
  creator: {
    type: mongoose.Schema.ObjectId, ref: 'User',
    required: 'Please enter your name as the creator of this project.'
  },
  startDate: {
    type: Date,
    required: 'Please enter a start date for this project.'
  },
  endDate: {
    type: Date,
    required: 'Please enter an end date for this project.'
  },
  contributors: [{
    type: mongoose.Schema.ObjectId, ref: 'User',
    required: 'A project requires at least one contributor.'
  }],
  resources: [{
    type: mongoose.Schema.ObjectId, ref: 'Resource',
    required: 'A project requires at least one resource.'
  }],
  location: {
    type: String,
    required: 'Please enter a location for this project.'
  },
  totalSteps: {
    type: Number,
    min: 1,
    max: 50
  },
  progressStep: {
    type: Number,
    default: 1
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  deletionFlag: {
    type: Boolean,
    default: false
  }
});
