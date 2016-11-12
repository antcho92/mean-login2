var login = require('./../controllers/loginController.js');

module.exports = function(app) {
  app.get('/users', login.index);
  app.post('/users', login.register);
  app.post('/login', login.login);
}
