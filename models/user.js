'use strict';

let mongoose = require('mongoose');
//let bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({
  userName: String,
  //password: String,

  games: [{
    type: mongoose.Schema.Types.Mixed,
    ref: 'Game'
  }]
});

let User = mongoose.model('User', userSchema);

module.exports = User;
