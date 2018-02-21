import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import {

} from '../src/controllers/userController';
import app from '../app';

chai.use(chaiHttp);
//let assert = chai.assert();
let should = chai.should();

describe('UserController', function() {
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

  

});
