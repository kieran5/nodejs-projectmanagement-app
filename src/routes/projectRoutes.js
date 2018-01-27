const routes = (app) => {

  // Get all projects
  app.route('/')
  .get((req, res) =>
    res.send('GET all projects successful.')
  )

  // Save a project
  .post((req, res) =>
    res.send('POST of project successful.')
  );

  // Get single project by ID
  app.route('/:id')
  .get((req, res) =>
    res.send('GET project by id successful.')
  )

  // Update project by project ID
  .put((req, res) =>
    res.send('PUT project updates successful.')
  )

  // Delete project by project ID
  .delete((req, res) =>
    res.send('DELETE project successful.')
  );
}

module.exports = routes;
