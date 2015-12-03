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


let User = require('./models/user');
let users = [];

let Game = require('./models/game');

io.on('connection', (client) => {
  console.log('User has connected');
  client.on('user added', (data) => {
    let newUser = new User;
    newUser.userName = data.userName;
    users.push(newUser);

    if (users.length === 2){
      let newGame = new Game;
      newGame.player1 = users[0];
      newGame.player2 = users[1];

      newGame.makeDeck();
    }
  })
})


server.listen(app.get('port'), () => {
  console.log("Node app is running at localhost:" + app.get('port'));
})
