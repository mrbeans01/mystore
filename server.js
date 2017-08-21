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

// Get our API routes
const admin = require('./server/admin/routes/users');



// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/admin', admin);

app.use('/adminUser', (req, res) =>{
  console.log("adminUser");
  res.sendFile(path.join(__dirname, 'dist/dist1/index.html'));
});


// Catch all other routes and return the index file
app.get('/', (req, res) => {
  console.log("test");
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});




// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
