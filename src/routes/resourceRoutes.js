import {
  addNewResource,
  updateResource,
  deleteResource,
  getAllAvailableResources
} from '../controllers/resourceController';

const routes = (app) => {
  app.route('/resources')
  .post(addNewResource);


  app.route('/resources/:id')
  .put(updateResource)
  .delete(deleteResource);

  app.route('/resources/available')
  .get(getAllAvailableResources);
};

module.exports = routes;
