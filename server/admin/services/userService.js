const config = require('../../config/config');

const User = require('../model/User');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
const Q = require('q');

var userService = {};
userService.authenticate = authenticate;
userService.setUp = setUp;
userService.getAll = getAllUser;

function setUp() {
  var deferred = Q.defer();
  var nick = new User({
    username: 'Nick Cerminara',
    password: 'password'
  });
  nick.save(function (err) {
    if (err) {
      deferred.resolve({
        success: false,
        message: err
      });
    }
    deferred.resolve({
      success: true,
      message: 'User saved successfully'
    });
    console.log('User saved successfully');
    //res.json({ success: true });
  });
  return deferred.promise;
}

function authenticate(username, password) {

  var deferred = Q.defer();
  User.findOne({
    username: username
  }, function (err, user) {
    if (err) throw err;


    if (!user) {
      deferred.resolve({
        success: false,
        message: ''
      });
    } else {

      user.comparePassword(password, function(err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(user, config.secret, {
            expiresIn: 60*60
          });
          deferred.resolve({
            success: true,
            message: 'Authentication successfull',
            token
          });
        } else {
          deferred.resolve({
            success: false,
            message: 'Authentication failed. Passwords did not match.'
          });
        }
      });
    }
  });

  return deferred.promise;
}


function getAllUser() {
  var deferred = Q.defer();
  User.find({
  }, function (err, users) {
    if (err) throw err;

    var newUser = users.map(function (user) {
       return {_id:user._id ,username :user.username};
    });
    deferred.resolve(
      newUser
    );
  });

  return deferred.promise;
}
module.exports = userService;
