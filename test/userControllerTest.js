import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  User
} from '../src/controllers/userController';
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
      'password': 'myPass'
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

  

  /*describe('Register user and check password is being hashed (e.g. entered password does not match password from DB)', function() {
    it('Should return that passwords do not match', function(done) {
      chai.request(app)
        .post('/register')
        .send({
          'username': 'Test',
          'password': 'password',
          'passwordConf': 'password'
        })
        .end(function(err, res) {
          User.findOne({ 'username': 'Test' }, 'password');

          console.log("YEEEEEEEEEEEEEEEEE: " + user);

          user.password.should.not.equal('password');

          User.remove({ 'username': 'Test' }, function(err, user) {
            if (err) console.log(err);
          });

          done();
        })
    });
  });


User.findOne( {var: var}, function(err, user) {

  var result = bcrypt.compareSync(non hashed, hashed)
}*/



});
