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
app.use('/scripts', express.static(__dirname + '/node_modules/cards'))

////SOCKET CONNECTION!

let users = [];

io.on('connection', (client) => {
  console.log('User has connected');
  client.on('user added', (data) => {
    let newUser = {};
    newUser.userName = data.userName;
    users.push(newUser);

    if (users.length === 2){
      io.emit('two players', users)

    }
  })
})


server.listen(app.get('port'), () => {
  console.log("Node app is running at localhost:" + app.get('port'));
})
