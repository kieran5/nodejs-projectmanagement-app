import mongoose from 'mongoose';


export const ResourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'A resource requires a name.'
  },
  availability: {
    type: Boolean,
    default: true
  }
});
