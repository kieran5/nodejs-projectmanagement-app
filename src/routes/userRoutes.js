import {
  createUser,
  checkUser,
  logoutUser
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
}

module.exports = routes;
