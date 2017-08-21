const mongoose = require('mongoose')
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const config = require('./server/config/config');




mongoose.connect(config.database);

//Get the default connection
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
  console.log("Connection with database succeeded.");
});


const app = express();
app.set('superSecret', config.secret);
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist1')));
//app.use('/myadmin', express.static(path.join(__dirname, 'dist2')));
//app.use('/', express.static(path.join(__dirname, 'dist1')));

// Get our API routes

// Set our api routes
const adminRouter = require('./server/admin/routes/users');



const adminApp = express();

adminApp.set('superSecret', config.secret);
// Parsers for POST data
adminApp.use(bodyParser.json());
adminApp.use(bodyParser.urlencoded({ extended: false }));
adminApp.use('/', express.static(path.join(__dirname, 'dist2')));








// Catch all other routes and return the index file


//
// app.use(function(req, res, next) {
//   console.log("authentication ")
//
//   console.log(req.url);
//   if (req.url === '/' || req.url === '/admin/authenticate') return next();
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
//   if (token) {
//
//     // verifies secret and checks exp
//     jwt.verify(token, app.get(config.secret), function(err, decoded) {
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;
//         next();
//       }
//     });
//
//   } else {
//
//     return res.status(403).send({
//       success: false,
//       message: 'No token provided.'
//     });
//
//   }
// });

//app.use('/admin', adminRouter);

// app.use('/', function () {
// //   app.get('/', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'src/index.html'));
// // });
//
//   app.use(express.static(path.join(__dirname, 'dist1')));
// });

adminApp.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist2/index.html'));
});
adminApp.use('/admin', adminRouter);


// adminApp.use('/', function () {
//   app.use(express.static(path.join(__dirname, 'dist2')));
// });
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'src/index.html'));
// });





/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);


const portAdmin = process.env.PORTADMIN || '3001';
adminApp.set('port', portAdmin);
/**
 * Create HTTP server.
 */
//const server = http.createServer(app);
const serverAdmin = http.createServer(adminApp);

/**
 * Listen on provided port, on all network interfaces.
 */
//server.listen(port, () => console.log(`API running on localhost:${port}`));
serverAdmin.listen(portAdmin, () => console.log(`API running on localhost:${portAdmin}`));
