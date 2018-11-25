var User = require('../models/userModel.js');
jwt = require('jwt-simple');

module.exports = {

    getUser: function (req, res, next) {

        var token = req.headers['x-access-token'];
        console.log(token);
        user = jwt.decode(token, 'secret');
        User.findOne({ username: user.username }, function (err, user) {
            if (err)
                res.status(500).send(err);
            res.json(user);
        })

    },

    signin: function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        User.findOne({ email: email })
            .exec(function (error, user) {
                if (error) {
                    console.log(error);
                    res.status(500).send(error);
                } else if (!user) {
                    res.status(500).send(new Error('User does not exist'));
                } else {
                    //console.log('hi')
                    user.comparePassword(password, user.password, res, function (found) {
                        if (!found) {
                            res.status(500).send('Wrong Password');
                        } else {
                            var token = jwt.encode(user, 'secret');
                            res.setHeader('x-access-token', token);
                            res.json({ token: token, userId: user._id });
                        }
                    });
                }
            });
    },
    requestNewPass: function (req, res) {
        var token = req.headers['x-access-token'];
        user = jwt.decode(token, 'secret');
        User.findOne({ username: user.username }, function (err, user) {
            if (err)
                res.status(500).send(err);
            user.password = req.body.newPassword;
            user.save(function (err, savedUser) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    //we will send here Email the new Password
                    res.json(user);
                }
            });

        })
    },
    signup: function (req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        var fullname = req.body.fullname;
        var email = req.body.email;
        var profilePicture = req.body.profilePicture;

        User.findOne({ username: username })
            .exec(function (err, user) {
                if (!user) {
                    var newUser = new User({
                        password: password,
                        username: username,
                        fullname: fullname,
                        email: email,
                        profilePic: profilePicture

                    });
                    newUser.save(function (err, newUser) {
                        var token = jwt.encode(newUser, 'secret');
                        res.setHeader('x-access-token', token);
                        res.json({ token: token, userId: newUser._id });
                    });
                } else {
                    next(new Error('User already exists'))
                }
            });
    }

}