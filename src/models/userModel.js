import mongoose from 'mongoose';


export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Please enter a username to register.',
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: 'Please enter a password for your account.'
  },
  passwordConf: {
    type: String
  }
});
