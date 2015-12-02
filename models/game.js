'use strict';

let mongoose = require('mongoose');
let cards = require('cards');
let gameSchema = new mongoose.Schema({
  gameDeck: [],

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

gameSchema.methods.makeDeck = function() {

}

let Game = mongoose.model('Game', gameSchema);

module.exports = Game;
