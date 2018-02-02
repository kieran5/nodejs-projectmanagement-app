import {
  addNewProject,
  getAllProjects,
  getProjectByID,
  updateProject
} from '../controllers/projectController';

const routes = (app) => {
  /*** Get all projects ***/
  app.route('/')
  .get((req, res, next) => {
    // Middleware
    console.log(`Request from: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    // next() - passing along to the next function below
    // the res.send code will not execute without this next() call
    next();
  }, getAllProjects)

  /*** Save a project ***/
  .post(addNewProject);

  /*** Get single project by ID ***/
  app.route('/:id')
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
  }, (req, res, next) => {
    res.send('DELETE project successful.');
  })
};

module.exports = routes;
