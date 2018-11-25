var bodyParser = require('body-parser');

module.exports = function (app, express) {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(express.static('public'));

    // log all api traffic to console
    app.use('api/*', req => {
        console.log(req);
        next();
    });
    app.listen(3000);
};