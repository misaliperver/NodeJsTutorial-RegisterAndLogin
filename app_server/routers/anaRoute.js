var path = require('path');
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

var router = express.Router();
var anaController = require(path.join(__dirname, '../controllers/anaController.js'));
var loginController = require(path.join(__dirname, '../controllers/loginController.js'));


router.use(function(req, res, next){
    console.log('middleware anaRoute');
    next();
});

router.get('/', anaController.get_AnaSayfa);//anasayfaya yönlendir
router.get('/giris', LoginOldumu2 , loginController.get_Giris);
router.get('/kayitol', LoginOldumu2 , loginController.get_KayitOl);
router.post('/kayitol', LoginOldumu2 , loginController.post_KayitOl);
router.post('/giris', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/giris', failureFlash: true }), loginController.post_Giris);//Giriş yaptıysa buraya birdaha gelemesin
router.get('/cikis', loginController.get_Cikis);


function LoginOldumu2(req, res, next){
	if(req.isAuthenticated()){
		res.redirect('/');
	} else {
		return next();
	}
}

module.exports = router;