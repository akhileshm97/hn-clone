const passport = require('passport');
const User = require('../database/models/user');

exports.getTest = (req, res) => {
	res.json("Hello there");
}

exports.postTest = (req, res) => {
	console.log(req.body);
	res.json(`Received ${req.body}`);
}

exports.signUp = (req, res) => {
	User.register(new User({username: req.body.username}), req.body.password, (err, newUser) => {
	  if(err){
			console.log(err);
		}
		passport.authenticate("local")(req, res, function(){
			console.log("Added user: " + newUser.username);
			console.log(req.user);
			res.json({
				currentUser: req.user, 
	      loggedIn: true, 
				message: "You have successfully signed up"
			});
		})
	})
}

exports.signIn = (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) { return next(err); }
    if (!user) { return res.json({userFound: false}); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      else {
      	console.log("logged in as: " + user.username);
      	console.log(req.user);
				console.log(res.locals);
	      return res.json({ 
	      	currentUser: user, 
	      	loggedIn: true, 
	      	userFound: true, 
	      	message: 'You have logged in' 
	      });
	    }
    })
  }) (req, res, next);
}

exports.signOut = (req, res) => {
	req.logout();
	res.json({
		currentUser: null,
		username: '',
		message: 'You have logged off',
		loggedIn: false
	});
}