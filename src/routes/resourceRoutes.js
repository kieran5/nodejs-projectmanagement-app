import {
  addNewResource,
  updateResource,
  deleteResource,
  getAllAvailableResources
} from '../controllers/resourceController';

const routes = (app) => {
  app.route('/resource')
  .post(addNewResource);


  app.route('/resource/:id')
  .put(updateResource)
  .delete(deleteResource);

  app.route('/resource/available')
  .get(getAllAvailableResources);
};

module.exports = routes;
