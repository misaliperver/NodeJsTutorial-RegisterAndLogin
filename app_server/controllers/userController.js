var path = require('path'); //path modülünü ekledik

module.exports.get_profil = function(req, res){
    res.render('Secret/user', {msg:'hosgeldiniz'});

}