// Server
var express = require('express');
var projectRoutes = require('./src/routes/projectRoutes');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Initialise express and port number
const app = express();
const PORT = 3000;

// Pass express in to our project routes file to allow the
// routes to be reached on the server
projectRoutes(app);

// Mongoose connection
// Use a promise to make sure a connection is definitely made &
// the server does not just sit waiting for a connection
mongoose.Promise = global.Promise;
// Connect to mongo on localhost
mongoose.connect('mongodb://localhost/AAFdb', {
  // Need this option to be enabled so we don't get an error
  // Due to an update to Mongoose that causes issues when
  // trying to connect to Mongo without this option
  //useMongoClient: true
});

// Body parser setup
// This is required in order for us to make POST's to the Mongo database
// Makes data available in req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);
