// http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.Wo1hBejFLIU

import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  Project,
  deleteProject
} from '../src/controllers/projectController';
import app from '../app';

chai.use(chaiHttp);
let should = chai.should();
let assert = chai.assert;


describe('ProjectController', function() {

  beforeEach(function(done) {
    var newProject = new Project({
      'name': 'My Test Project',
      'creator': '5a7f62c16b490726c440613a',
      'startDate': '02-30-2018',
      'endDate': '02-28-2019',
      'contributors': [],
      'resources': [],
      'location': 'Sheffield',
      'totalSteps': '10'
    });

    newProject.save(function(err) {
      done();
    });
  });

  afterEach(function(done) {
    Project.remove({ name: "My Test Project" }, function(err) {
      if (err) console.log(err);
    });
    done();
  });

  describe('GET all projects test', function() {
    it('Should return list of ALL projects JSON objects on /projects GET', function(done) {
      chai.request(app)
        .get('/projects')
        .end(function(err, res) {
          res.should.be.json;
          res.body.should.be.a('array');
          res.body[0].should.have.property('_id');
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('creator');
          res.body[0].should.have.property('startDate');
          res.body[0].should.have.property('endDate');
          res.body[0].should.have.property('contributors');
          res.body[0].should.have.property('resources');
          res.body[0].should.have.property('location');
          res.body[0].should.have.property('totalSteps');
          res.body[0].should.have.property('progressStep');
          res.body[0].should.have.property('createdDate');
          res.body[0].should.have.property('deletionFlag');
          done();
        });
    });
  });

  describe('POST new project to database test', function() {
    it('Should return new project JSON object that has just been added to db', function(done) {
      chai.request(app)
        .post('/projects')
        .send({
          'name': 'Test Project',
          'creator': '5a7f62c16b490726c440613a',
          'startDate': '02-30-2018',
          'endDate': '02-28-2019',
          'contributors': [],
          'resources': [],
          'location': 'Sheffield',
          'totalSteps': '10'
        })
        .end(function(err, res) {
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('creator');
          res.body.should.have.property('startDate');
          res.body.should.have.property('endDate');
          res.body.should.have.property('contributors');
          res.body.should.have.property('resources');
          res.body.should.have.property('location');
          res.body.should.have.property('totalSteps');
          res.body.should.have.property('progressStep');
          res.body.should.have.property('createdDate');
          res.body.should.have.property('deletionFlag');
          res.body.name.should.equal('Test Project');

          // Remove test project from DB after each time this test has executed
          Project.remove({ name: "Test Project" }, function(err) {
            if (err) console.log(err);
          });
          done();
        });
    });
  });

  //describe('', function() {

  //});




});
