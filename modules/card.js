'use strict';

module.exports = function Card(suit, number, rankStr, suitSym, $card) {
  //constructor of Card object.
 //expected inputs: suit (str), number = num
 this.suit = suit;
 this.number = number;
 this.rank = rankStr;
 this.suitSym = suitSym;
 this.$card = null;
};
