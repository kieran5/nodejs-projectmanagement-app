//import assert from 'chai'.assert();
//import projectController from '../../controllers/projectController';

//const assert = require('chai').assert;
//const testFunc = require('../../src/controllers/projectController').testFunc;

import { assert } from 'chai';
import {
  testFunc
} from '../src/controllers/projectController';

describe('ProjectController', function() {
  describe('testFunc() test', function() {
    it('Test func should return hello', function() {
      assert.equal(testFunc(), 'hello');
    });

    it('Test func should return type string', function() {
      assert.typeOf(testFunc(), 'string');
    });
  });

  describe('addNewProject test', function() {
    it('Add new project should return new project JSON object', function() {
      //assert.
    });
  });
});
