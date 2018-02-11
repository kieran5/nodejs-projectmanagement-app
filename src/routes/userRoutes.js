import {
  createUser,
  checkUser,
  logoutUser,
  getAllUsers,
  updateUser,
  deleteUser,
  loginRequired,
  adminAccountCheck
} from '../controllers/userController';

const routes = (app) => {
  app.route('/register')
  .post((req, res, next) => {
    console.log(`Request from: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)

    next();
  }, createUser)

  app.route('/login')
  .post(checkUser);

  app.route('/logout')
  .get(logoutUser);

  app.route('/users')
  .get(adminAccountCheck, getAllUsers);

  app.route('/user/:id')
  .put(adminAccountCheck, updateUser)
  .delete(adminAccountCheck, deleteUser);
}

module.exports = routes;
