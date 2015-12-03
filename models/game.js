'use strict';

let Deck = require('./modules/deck.js');

let mongoose = require('mongoose');


let gameSchema = new mongoose.Schema({
  gameDeck: String,
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
  console.log('building a deck for this game');

  let newDeck = new Deck();
  newDeck.build();
  newDeck = newDeck.shuffle();

  //store deck state by only storing cards!
  console.log(JSON.stringify(newDeck.cards));

}

gameSchema.methods.deal = function() {
  console.log('Dealing cards for the game');
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
