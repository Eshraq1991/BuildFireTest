var Q = require('q');
var mongoose = require('mongoose');

var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: String,
    salt: String,
    profilePic: String,
});


UserSchema.methods.comparePassword = function (candidatePassword, savedPassword, res, cb) {
    bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
        if (err) {
            res.status(500).send('Error');
        } else if (cb) {
            cb(isMatch);
        }
    });
};


UserSchema.pre('save', function (next) {
    var user = this;
    console.log("///////////////////");
    console.log(user);
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }

            user.password = hash;
            user.salt = salt;
            next();
        });
    });
});


module.exports = mongoose.model('User', UserSchema);