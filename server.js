'use strict';

let express = require('express');
let app = express();

let logger = require('morgan');
let path = require('path');
let bodyParser = require('body-parser');

let server = require('http').createServer(app);
let io = require('socket.io')(server);


app.set('port', process.env.PORT || 3000);



(function() {

  // Step 1: Create & configure a webpack compiler
  let webpack = require('webpack');
  let webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config');
  let compiler = webpack(webpackConfig);

  // Step 2: Attach the dev middleware to the compiler & the server
  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }));

  // Step 3: Attach the hot middleware to the compiler & the server
  app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));
})();

app.use(express.static('public'));

let user = require('./controllers/usersController');
app.use('/user', user);

//// Require game modules to be hosted on back end

let Game = require('./modules/game.js');


////
////SOCKET CONNECTION!

let users = [];
//one way to not make a game a global letiable is to store it in mongoDB.
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

      if (!game.checkWin()) {
        io.emit('player defend', game.state());
      }
      else {
        io.emit('attack wins', game.state());
      }
    }
    else {
      //if card cannot be played, user must select another card
      io.emit('attack again')
    }
  });

  client.on('defend card', (data) => {
    //vet the card that the player has chosen.

    if (game.vetDefendCard(data.defendingCard,game.trump)) {
      //if the game rules allow for this card to be played.
      game.makeDefend(data);

      if (!game.checkWin()) {
        io.emit('attack again', game.state());
      }
      else {
        io.emit('defence wins', game.state());
      }
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
