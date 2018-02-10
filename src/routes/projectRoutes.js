import {
  addNewProject,
  getAllProjects,
  getProjectByID,
  updateProject,
  deleteProject
} from '../controllers/projectController';

import {
  loginRequired
} from '../controllers/userController';

const routes = (app) => {
  /*** Get all projects ***/
  app.route('/')
  .get((req, res, next) => {
    // Middleware
    console.log(`Request from: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)
    console.log(req.session.userID);

    // next() - passing along to the next function below
    // the res.send code will not execute without this next() call
    next();
  }, loginRequired, getAllProjects)

  /*** Save a project ***/
  .post(addNewProject);

  /*** Get single project by ID ***/
  app.route('/projects/:id')
  .get((req, res, next) => {
    // Middleware
    console.log(`Request from: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    next();
  }, getProjectByID)

  /*** Update project by project ID ***/
  .put((req, res, next) => {
    // Middleware
    console.log(`Request from: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    next();
  }, updateProject)

  /*** Delete project by project ID ***/
  .delete((req, res, next) => {
    // Middleware
    console.log(`Request from: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    next();
  }, deleteProject)
};

module.exports = routes;
