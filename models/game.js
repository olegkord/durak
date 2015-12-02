'use strict';

let Card = require('./modules/card.js');
let Deck = require('./modules/deck.js');

debugger;

let mongoose = require('mongoose');


let gameSchema = new mongoose.Schema({
  gameDeck: [],
  trumpSuit: String,

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
  this.gameDeck.build();
  this.gameDeck.shuffle();
}

gameSchema.methods.deal = function() {
  for (var i = 0; i < 6; i++){
    this.p1hand.push(this.gameDeck.cards.pop());
    this.p2hand.push(this.gameDeck.cards.pop());
  }
}

gameSchema.methods.setTrump = function() {
  this.trumpSuit = this.gameDeck.cards[this.gameDeck.cards.length-1].suit;
  this.gameDeck.cards.push(this.gameDeck.cards.pop);
}

let Game = mongoose.model('Game', gameSchema);

module.exports = Game;

//helper functions
