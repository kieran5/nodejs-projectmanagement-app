import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import bcrypt from 'bcrypt';

const User = mongoose.model('User', UserSchema);

// Exported function for register user route to use
export const createUser = (req, res) => {
  // Check password field matches the password confirmed field
  // Show error message if they do not match
  if(req.body.password === req.body.passwordConf) {
    // Pass username and password fields text in to a new User object
    let newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    // Prior to saving our modelled object to the database, we want to hash the password
    // making use of the bcrpyt module. I used the below tutorial to help me a little:
    // https://medium.com/of-all-things-tech-progress/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359
    UserSchema.pre('save', function(next) {

      // Using bcrpyt's hash function to pass in the plain text password to be encrpyted
      // Using 10 salt rounds to hash the password - this is the computational cost on the processing of the hash
      bcrypt.hash(newUser.password, 10, function (err, hash) {
        if (err) {
          res.send(err);
        } else {
          // If no errors occur, we pass the hash in to the object ready to be saved to the DB
          newUser.password = hash;

          // Call next on this function as it is middleware
          // Without this, the below function would never be called and the object wouldn't get saved to the DB
          next();
        }
      })
    });

    // Saving our new user object to the Mongo DB
    newUser.save((err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.json(user);
        //res.redirect('/');
      }
    });
  } else {
    // Send error if password and confirm password fields are not the same
    res.json('Password and confirm password fields are different.');
  }
};

export const checkUser = (req, res) => {
  // Get hashed password for user from database
  // Find user by the username entered in to the text field by the user
  // Ask for the password field from the database and execute callback function
  User.findOne({ 'username': req.body.username }, 'password', (err, user) => {
    if (err) {
      res.send(err);
    } else {
      // bcrypt compare function will take the password entered in to the text
      // field, hash it, then compare with the hash pulled from the database
      bcrypt.compare(req.body.password, user.password, function(err, res) {
        if(res) {
          // Passwords match
          // Create a session
          // Return user to homepage with success message
          console.log(res);

        } else {
          // Password do not match
          // Return user to login page with error message
          console.log(res);
        }
      });
    }
  });
};
