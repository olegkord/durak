'use strict';

let mongoose = require('mongoose');
let Game = require('./game.js');
//let bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({
  userName: String,
  //password: String,

  games: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Game'
  }]
});

let User = mongoose.model('User', userSchema);

module.exports = User;
