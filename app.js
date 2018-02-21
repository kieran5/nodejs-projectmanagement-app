// Server
var express = require('express');
var projectRoutes = require('./src/routes/projectRoutes');
var userRoutes = require('./src/routes/userRoutes');
var resourceRoutes = require('./src/routes/resourceRoutes');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// Initialise express and port number
const app = express();
const PORT = 5000;

// Mongoose connection
// Use a promise to make sure a connection is definitely made &
// the server does not just sit waiting for a connection
// TODO: Need to add error handling for this Promise
mongoose.Promise = global.Promise;
// Connect to mongo on localhost
mongoose.connect('mongodb://localhost/AAFdb');
var db = mongoose.connection;

// Body parser setup
// This is required in order for us to make POST's to the Mongo database
// Makes data available in req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup sessions to be used for login
// Needs to be setup after body parsed as we need the parsed values to place them in to a session
// Resave is set to false as this would resave the session on every request which
// is not required as we will only need to save and update a session on specific requests
// saveUnitialized set to false so that sessions are only saved once they have been initialised
// with some data (e.g. req.session.user has a value assigned to it)
app.use(session({
  secret: 'big-secret',
  resave: false,
  saveUnitialized: false
  /*store: new MongoStore({
    mongooseConnection: db
  }),
  // maxAge expects ms - hours * 60 minutes * 60 seconds * 1000 ms
  cookie: { maxAge: 1 * 60 * 1000 }*/
}));

app.get('*', (req, res, next) => {
  res.locals.user = req.session || null;
  console.log("res.locals.user: " + JSON.stringify(res.locals.user));
  next();
});

// Pass express in to our routes files to allow the
// routes to be reached on the server
projectRoutes(app);
userRoutes(app);
resourceRoutes(app);

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);

module.exports = app;
