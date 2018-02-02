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
    type: String,
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
  // TODO: Change type of contributors to a custom data type
  contributors: {
    type: String
  },
  // TODO: Change type of resources to a custom data type
  resources: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});
