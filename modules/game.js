'use strict';

let Deck = require('./deck');

module.exports = function Game(player1Name,player2Name){
  //constructor function for a new game object.

  this.deck = new Deck;
  this.trump = '';

  this.numOnField = [];
  //This will be an array of arrays holding pairs of cards in the middle of the field.
  this.fieldCards = [];
  this.players = []

  this.player1 = {
    name: player1Name,
    hand: []
  };
  this.player2 = {
    name: player2Name,
    hand: []
  };

  this.attacking = 0;
  this.defending = 1;

///Object functions
  this.state = function() {
    return {
      deck: this.deck,
      trump: this.trump,
      numOnField: this.numOnField,
      fieldCards: this.fieldCards,
      players: [this.player1, this.player2],
      player1: this.player1,
      player2: this.player2,
      attacking: this.attacking,
      defending: this.defending
    }
  }
  this.start = function() {
    this.makeDeck();
    this.deal();
  }

  this.makeDeck = function() {
    //start a game: build the deck and shuffle
    this.deck.build();
    this.deck.shuffle();
  }

  this.giveCard = function(player) {
    //expected input: player object
    player.hand.push(this.deck.cards.pop());
  }

  this.deal = function() {
    //deal cards to players.
    for (let i = 0; i< 6; i++){
      this.giveCard(this.player1);
      this.giveCard(this.player2);
    }

    this.trump = this.deck.cards[this.deck.cards.length-1].suit;
    this.deck.cards.push(this.deck.cards.pop());
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

  this.makeAttack = function(cardData){
    //This function covers all requirements for an attack
    let handIndex = cardData.handIndex;
    let newPair = [];
    //remove card from player's hand and put into the field.
    
    newPair.push(this.players[this.attacking].hand.splice(handIndex,1));

    this.fieldCards.push(newPair);

  }

  this.makeDefend = function($card){
    //turn off attacking player's click events here



    //get suit and value of card first
  }
  this.recover = function() {

    this.nextTurn();
  }
  //helper functions not directly related to gameplay:
  this.generateNewField = function($card) {
    let $newField = $('<div/>').addClass('player').addCLass('field').attr('id',this.numPairs.toString());
    $('.player#center').append($newField);
    $newField = $newField.children().eq(this.numPairs);
    $newField = $newField.append($('<ul/>').addClass('hand').append($card.parent()));
  }

}
