import {
  createUser,
  checkUser,
  logoutUser,
  getAllUsers,
  updateUser,
  deleteUser,
  loginRequired,
  adminAccountCheck,
  getCurrentUser
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
  .get(getAllUsers);

  app.route('/user/:id')
  .put(adminAccountCheck, updateUser)
  .delete(adminAccountCheck, deleteUser);

  /*** Get the logged in user from session if there is one ***/
  app.route('/user/current')
  .get((req, res, next) => {
    console.log(`Request from: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)
    console.log("yenah: " + req.session.userID);

    next();
  }, getCurrentUser)
}

module.exports = routes;
