var userController = require('../app/controllers/userController.js');

module.exports = function (app, express) {

    app.post('/api/users/requestPass', userController.requestNewPass);
    app.get('/api/users/currentUser', userController.getUser);
    app.post('/api/users/signin', userController.signin);
    app.post('/api/users/signup', userController.signup);

}