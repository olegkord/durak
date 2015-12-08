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
//one way to not make a game a global variable is to store it in mongoDB.
let game = null;

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

//---> Global!!
      game = new Game(users[0].userName,users[1].userName);
      game.players = [game.player1, game.player2];
      game.start();

      io.emit('two players', game.state());
    }
  });

  client.on('player attack', (data) => {
    //update game state with the attack and return game state to front end.
    if (game.vetAttackCard(data.attackingCard)) {
      game.makeAttack(data);
      io.emit('player defend', game.state());
    }
    else {
      //if card cannot be played, user must select another card
      io.emit('attack again')
    }
  });

  client.on('defend card', (data) => {
    //vet the card that the player has chosen.
    if (game.vetDefendCard(data.defendingCard)) {
      //if the game rules allow for this card to be played.
      game.makeDefend(data);
      io.emit('attack again', game.state());
    }
    else {
      //if game rules do not allow for this card to be played.
      io.emit('player defend', game.state());
    }
  });

  client.on('end round', (data) => {
    io.emit('attack again', game.nextTurn());
  });

  client.on('take cards', (data) => {
    io.emit('attack again', game.playerTakes());
  })
})


server.listen(app.get('port'), () => {
  console.log("Node app is running at localhost:" + app.get('port'));
})
