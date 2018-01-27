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
  }, (req, res, next) => {
    res.send('GET all projects successful.');
  })

  /*** Save a project ***/
  .post((req, res, next) => {
    // Middleware
    console.log(`Request from: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    next();
  }, (req, res, next) => {
    res.send('POST of project successful.');
  })

  /*** Get single project by ID ***/
  app.route('/:id')
  .get((req, res, next) => {
    // Middleware
    console.log(`Request from: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    next();
  }, (req, res, next) => {
    res.send('GET project by id successful.');
  })

  /*** Update project by project ID ***/
  .put((req, res, next) => {
    // Middleware
    console.log(`Request from: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    next();
  }, (req, res, next) => {
    res.send('PUT project updates successful.');
  })

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
