'use strict';

let express = require('express');
let app = express();

let logger = require('morgan');
let path = require('path');
let bodyParser = require('body-parser');

let server = require('http').createServer(app);
let io = require('socket.io')(server);

app.set('port', 3000);
app.use(express.static('public'));
app.use('/scripts', express.static(__dirname + '/node_modules/angular'));
app.use('/scripts', express.static(__dirname + '/node_modules/underscore'));

let user = require('./controllers/users_controller');
app.use('/users', user);

io.on('connection', (client) => {
  console.log('User has connected');
})


server.listen(app.get('port'), () => {
  console.log("Node app is running at localhost:" + app.get('port'));
})
