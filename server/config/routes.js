var login = require('./../controllers/loginController.js');

module.exports = function(app) {
  app.post('/users', login.create);
}
