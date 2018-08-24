var passport = require('passport');
var User = require('../models/user');

module.exports.get_Giris = function(req, res){
   console.log(req.url) 
   res.render('SignInUp/giris');
}
module.exports.get_KayitOl = function(req, res){
    res.render('SignInUp/kayitol');
}


module.exports.post_KayitOl = function(req, res){
    var email     = req.body.email;
	var username = req.body.username;
	var sifre  = req.body.sifre;
    var sifre2 = req.body.sifre2;

    // Validation
    req.checkBody('email', 'Email kısmı boş bırakılmamalıdır.').notEmpty();
    req.checkBody('email', 'Email doğru tanımlı değil.').isEmail();
	req.checkBody('username', 'username kısmı boş bırakılmamalıdır.').notEmpty();
	req.checkBody('sifre', 'Sifre kısmı boş bırakılmamalıdır.').notEmpty();
    req.checkBody('sifre2', 'Sifreler birbiri ile uyumsuz.').equals(req.body.sifre);

    var hatalar = req.validationErrors();
	if (hatalar) {
		res.render('SignInUp/kayitol', {
			hatalar: hatalar
		});
	}
	else {
		//checking for email and username are already taken
		User.findOne({ username: { 
			"$regex": "^" + username + "\\b", "$options": "i"
	        }}, function (err, user) {
                    User.findOne({ email: { 
                        "$regex": "^" + email + "\\b", "$options": "i"
		        }}, function (err, mail) {
                        if (user || mail) {
                            res.render('SignInUp/kayitol', {
                                user: user,
                                mail: mail
                            });
				        }
                        else {
                            var newUser = new User({
                                email: email,
                                username: username,
                                password: sifre
                            });
					        User.createUser(newUser, function (err, user) {
                            if (err) throw err;
                            console.log(user);
					        });
                            req.flash('success_msg', 'You are registered and can now login');
                            res.redirect('/giris');
                        }
			});
		});
	}
}

module.exports.post_Giris = function(req, res){
    res.redirect('/');
}

module.exports.get_Cikis = function (req, res) {
	req.logout();

	//req.flash('success_msg', 'You are logged out');..

	res.redirect('/giris');
}