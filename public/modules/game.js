'use strict';

function Game(){
  //constructor function for a new game object.

  this.deck = undefined;
  this.trump = undefined;

  this.player1 = {};
  this.player2 = {};

  this.attacking = undefined;
  this.defending = undefined;


///Object functions

  this.start = funtion() {
    this.makeDeck();
    this.deal();

    this.attacking = 0;
    this.defending = 1;
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

  this.nextTurn = function() {
    if (this.attacking === 0){
      this.attacking = 1;
      this.defending = 0;
    }
    else {
      this.attacking = 0;
      this.defending = 1;
    }
  }

  this.makeAttack = function($card){

  }




}
