// Uygulamadaki Tüm Yönlendiriciler bu Klasörde Olacak
var path = require('path');

var anaRoute = require(path.join(__dirname, './anaRoute.js')); // Yönlendirici modulüm ile controllere ulaşıp oradanda sayfalarımı yayınayacağım MVC gibi düşün
var userRoute = require(path.join(__dirname, './userRoute.js'));


module.exports = function(app){

    app.use('/user', LoginOldumu , userRoute);
    
    app.use('/', anaRoute); // req '/' olduğunda bizim kurduğumuz route nesenesine gidecek
                        // Burada login işlenleri için  app.use('/login', Loginroute); olabilirdi
	app.use(function(req, res, next){ // 404 - ErorrPage
		res.status(404);	
		// respond with html page
		if (req.accepts('html')) {
			res.render('404', { url: req.url });
			return;
		}	
		// respond with json
		if (req.accepts('json')) {
		res.send({ error: 'Not found' });
		return;
		}	
		// default to plain-text. send()
		res.type('txt').send('Not found');
	});
   
}
function LoginOldumu(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/giris');
	}
}