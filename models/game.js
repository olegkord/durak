'use strict';

let mongoose = require('mongoose');

let gameSchema = new mongoose.Schema({
  deck: [],

  player1: [{
    type: mongoose.Schema.Types.Mixed,
    ref: 'User'
  }],

  player2: [{
    type: mongoose.Schema.Types.Mixed,
    ref: 'User'
  }],

  p1hand: [],
  p2hand: []
})

let Game = mongoose.model('Game', gameSchema);

module.exports = Game;
