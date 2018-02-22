import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import bcrypt from 'bcrypt';

export const User = mongoose.model('User', UserSchema);

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
        //res.json(user);
        //res.json("Registration successful!");
        res.redirect('/');
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
          //res.json("Logged in successfully!");
          res.redirect('/');

          // Place user id in to session variable
          req.session.userID = user._id;

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

// Get all users function so that we can display a full list of users to admins
// so they can edit or delete user accounts
export const getAllUsers = (req, res) => {
  User.find({ }, (err, user) => {
    if (err) res.send(err);

    res.json(user);
  });
};

// Update user function so that an admin account is able to edit other use accounts
// We will make use of seperate middleware to ensure only admins can do this
export const updateUser = (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, user) => {
    if (err) res.send(err);

    res.json(user);
  });
};

// TODO: Check how to do this safely
// Will restrict this to be used by admin accounts only as well as edit user
export const deleteUser = (req, res) => {
  User.remove({ _id: req.params.id }, (err, user) => {
    if (err) res.send(err);

    res.json({ message: 'Successfully deleted user!'})
  });
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

// Middleware to check if a user is on an admin account to allow for special priviledges
export const adminAccountCheck = (req, res, next) => {
  // Check a user is logged in before doing check
  if(req.session.userID) {
    // Execute find query on database making use of user ID on current session
    // We only need the permissions field for this check
    User.findOne({ '_id': req.session.userID }, 'permissions', (err, user) => {
      // Check there are no errors when querying the database
      if (err) {
        res.send(err);
      } else {
        // Permissions are just strings. If admin account, tell the middleware
        // to make use of next to continue on to next function
        if(user.permissions === "admin") {
          return next();
        } else {
          // Otherwise we send an error telling user they are not on an admin account
          return next(new Error('You do not have permission to access this page.'));
        }
      }
    });
  } else {
    return next(new Error('You are not logged in.'));
  }
};

// Return current logged in user from session so front end knows which buttons to display etc.
export const getCurrentUser = (req, res) => {

  if(req.session.userID) {

    User.findById(req.session.userID, (err, user) => {
      if (err) res.send(err);

      res.json(user);
    });
  }
};
