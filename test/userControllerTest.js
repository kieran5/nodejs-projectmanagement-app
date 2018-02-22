import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  User
} from '../src/controllers/userController';
import {
  Project
} from '../src/controllers/projectController';
import app from '../app';

chai.use(chaiHttp);
//let assert = chai.assert();
let should = chai.should();

describe('UserController', function() {

  beforeEach(function(done) {
    var newUser = new User({
      'projects': [],
      'permissions': 'standard',
      'username': 'Test Account',
      'password': 'myPass',
      'passwordConf': 'myPass'
    });

    newUser.save(function(err) {
      done();
    });
  });

  afterEach(function(done) {
    User.remove({ username: "Test Account" }, function(err) {
      if (err) console.log(err);
    });
    done();
  });

  describe('Register user with POST request but with mismatching password and password confirmed fields', function() {
    it('Should return json error response', function(done) {
      chai.request(app)
        .post('/register')
        .send({
          'username': 'Test User',
          'password': 'pass',
          'passwordConf': 'passw'
        })
        .end(function(err, res) {
          res.should.be.json;
          res.body.should.equal('Password and confirm password fields are different.');
          done();
        })
    });
  });

  describe('Test a users projects list is updated after a new project is created with said user set as a contributor', function() {
    it('Should return users JSON object with new project in projects array', function(done) {
      chai.request(app)
      .get('/users')
      .end(function(err, res) {
        chai.request(app)
          .post('/projects')
          .send({
            'name': 'User Controller Test Project',
            'creator': '5a8ec4659474f55200e55874',
            'startDate': '02-30-2018',
            'endDate': '02-28-2019',
            'contributors': [res.body[0]._id],
            'resources': [],
            'location': 'Sheffield',
            'totalSteps': '10'
          })
          .end(function(err, res) {
            chai.request(app)
              .get('/users')
              .end(function(err, res) {

                // Put last pushed project in to result variable
                var result = res.body[0].projects[res.body[0].projects.length-1].toString();
                console.log(result);
                Project.findOne({ name: 'User Controller Test Project' }, '_id', function(err, project) {
                  console.log(project);
                  result.should.equal(project._id.toString());
                });

                // Remove test project from DB after each time this test has executed
                Project.remove({ name: 'User Controller Test Project' }, function(err) {
                  if (err) console.log(err);
                });

                done();
              });
          });
      });
    });
  });

  /*describe('Test session is set after successful login', function() {

  })*/


});
