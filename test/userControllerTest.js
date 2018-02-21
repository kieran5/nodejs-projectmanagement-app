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
  describe('Check new user POST & password is hashed test', function() {
    it('Should return a different password to the one that was entered by the user', function(done) {
      chai.request(app)
        .post('/users')
        .send({

        })
        .end(function(err, res) {
          //res.should.be.json;

          done();
        });
    });
  });
});
