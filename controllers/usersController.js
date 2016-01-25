'use strict';

let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');
let User = require('../models/user');
let Game = require('../models/game');

router.route('/login')
  .post( (req,res) => {
    console.log('Hit user login route');
  })

router.route('/new')
  .post( (req,res) => {
    console.log('Creating a new user');
  })


module.exports = router;
