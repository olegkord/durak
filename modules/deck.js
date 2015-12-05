'use strict';

let Card = require('./card');

module.exports = function Deck() {
 //constructor for a deck of cards.
 //member variables:
 this.cards = [];

 //member functions:
 this.shuffle = function(){
   //This function will shuffle the cards in the deck.
   //shuffle function taken from memory game.
   console.log('shuffling');

   for(var j, x, i = this.cards.length; i; j = Math.floor(Math.random() * i), x = this.cards[--i], this.cards[i] = this.cards[j], this.cards[j] = x);
 }
 this.build = function(){
   //This function will populate the deck with cards.
   console.log('building deck');
   let rank = '';
   let suits = ['diams','hearts','spades','clubs'];
   for (var j=0; j < suits.length; j++) {
     for (var i=6; i < 15; i++){
         switch(i) {
           case 11 :
             rank = 'j';
             break;
           case 12 :
             rank = 'q';
             break;
           case 13 :
             rank = 'k';
             break;
           case 14 :
             rank = 'a';
             break;
           default :
             rank = i.toString();
        }
        let myCard = new Card(suits[j], i);

        this.cards.push(new Card(suits[j], i));
       }
     }
   }
}
