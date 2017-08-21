const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');

router.use(function(err, req, res, next) {
  return res.status(500).send('Something broke!');
});

router.use(function(req, res, next) {
  if (req.url === '/authenticate/') return next();

  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    return res.status(401).send({
      success: false,
      message: 'No token provided.'
    });

  }
});



/* GET api listing. */
router.get('/users', (req, res) => {
  userService.getAll().then((users) =>{
    res.send(users)
  }).catch((err) => res.status(400).send(err));
});


//Smple user
// router.get('/setup', function(req, res) {
//   userService.setUp().then((msg)=>{
//
//   });
// });

router.post('/authenticate', (req, res) => {
  userService.authenticate(req.body.username, req.body.password)
    .then((user) => {
        if (user) {
          res.send(user);
        } else {
          // authentication failed
          res.status(400).send('Username or password is incorrect');
        }
  }).catch( (err) => {
      res.status(400).send(err);
  });
});


module.exports = router;
