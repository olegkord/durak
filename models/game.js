'use strict';

let mongoose = require('mongoose');

let gameSchema = new mongoose.Schema({
  deck: {},
  trump: String,
  numOnField: [String],
  fieldCards: String,
  players: [{
    type: mongoose.Schema.Types.Mixed,
    ref: 'User'
  }],
  player1: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'User'
  },
  player2: {
    type: mongoose.Schema.Types.Mixed,
    ref: 'User'
  },
  attacking: Number,
  defending: Number,
})
