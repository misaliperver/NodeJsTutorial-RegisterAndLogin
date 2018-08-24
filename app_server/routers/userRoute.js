var path = require('path');
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

var router = express.Router();
var userController = require(path.join(__dirname, '../controllers/userController.js'));


router.use(function(req, res, next){
    console.log('middleware anaRoute');
    next();
});

router.get('/', userController.get_profil);


module.exports = router;