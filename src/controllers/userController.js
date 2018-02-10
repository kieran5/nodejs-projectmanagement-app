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
    // We leave the passwordConf out of this object as we only want to hash
    // and save the password once to the DB
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

// Function to check user credentials and log in making use of a session
export const checkUser = (req, res) => {
  // Get hashed password for user from database
  // Find user by the username entered in to the text field by the user
  // Ask for the password field from the database and execute callback function
  User.findOne({ 'username': req.body.username }, 'password', (err, user) => {
    if (err) {
      res.send(err);
    } else if(!user) {
      // No username in database matching provided username
      res.json("No such username! Try again or register.");

    } else {
      // bcrypt compare function will take the password entered in to the text
      // field, hash it, then compare with the hash pulled from the database
      bcrypt.compare(req.body.password, user.password, function(err, match) {
        if(match) {
          // Passwords match
          // Return user to homepage with success message
          res.json("Logged in successfully!");

          // Place user id in to session variable
          req.session.userID = user._id;

          console.log(req.session);
          console.log(req.session.userID);

          return req.session.save();

        } else {
          // Password do not match
          // Return user to login page with error message
          return res.json("Incorrect username or password.");
        }
      });
    }
  });
};

// Function to log out and destroy the current user session
export const logoutUser = (req, res) => {
  // If a user session exists
  if(req.session.userID) {
    console.log("Session exists.");

    // Delete session object
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
        return res.json(err);
      } else {

        console.log("Session destroyed.");
        return res.redirect('/');
      }
    });

  } else {
    return res.json("Session does not exist...");
  }
};


// Middleware to check if user is logged in to allow access to specific pages (e.g. Creating a project)
export const loginRequired = (req, res, next) => {
  if(req.session && req.session.userID) {
    // If a user session exists then allow the middleware to move on to the
    // next function
    return next();
  } else {
    // Throw an error if there is no user session/no one is logged in
    return next(new Error('You must be logged in to access this page.'));
  }
};


//TODO: Middleware to check if a user has special priviledges (e.g. admin, project owner, project contributor)
