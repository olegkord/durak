'use strict';

function Game(){
  //constructor function for a new game object.

  this.deck = undefined;
  this.trump = undefined;

  this.player1 = {};
  this.player2 = {};

  this.start = funtion() {
    this.makeDeck();
    this.deal();
  }

  this.makeDeck = function() {
    //start a game: build the deck and shuffle
    let myDeck = new Deck();
    myDeck = myDeck.build();
    myDeck = myDeck.shuffle();
  }

  this.giveCard = function(player) {
    //expected input: player object
    player.hand.push(this.deck.pop);
  }

  this.deal = function() {
    //deal cards to players.
    for (var i = 0; i< 6; i++){
      this.giveCard(this.player1);
      this.giveCard(this.player2);
    }
  }


}
