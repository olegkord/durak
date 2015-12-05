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

//// Require game modules to be hosted on back end

  let Game = require('./modules/game.js');


////
////SOCKET CONNECTION!

let users = [];

io.on('connection', (client) => {

  console.log('User has connected');
  client.on('user added', (data) => {
    console.log('Data received');
    let newUser = {};
    console.log(data);
    newUser.userName = data;
    users.push(newUser);

    if (users.length === 2){
      //two users are now present, let's build a new game and export the state to the users.
      console.log('creating a new game');
      let game = new Game(users[0].userName,users[1].userName);
      game.start();

      io.emit('two players', game.state())


    }
  })
})


server.listen(app.get('port'), () => {
  console.log("Node app is running at localhost:" + app.get('port'));
})
