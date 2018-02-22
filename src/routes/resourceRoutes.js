import {
  addNewResource,
  updateResource,
  deleteResource,
  getAllAvailableResources
} from '../controllers/resourceController';

import {
  adminAccountCheck
} from '../controllers/userController';

const routes = (app) => {
  app.route('/resources')
  .post(adminAccountCheck, addNewResource);


  app.route('/resources/:id')
  .put(adminAccountCheck, updateResource)
  .delete(adminAccountCheck, deleteResource);

  app.route('/resources/available')
  .get(getAllAvailableResources);
};

module.exports = routes;
