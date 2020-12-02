const express = require('express');
const passport = require('passport');
const expressSession = require('express-session');
const LocalStrategy = require("passport-local");
const cors = require('cors');
const path = require('path');

const app = express();

const connectDB = require('./database');
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(expressSession({
	secret:'Secret line', 
	resave: false, 
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const User = require('./database/models/user');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const indexRoutes = require("./routes/index");
const articleRoutes = require("./routes/articles");

app.use('/api', indexRoutes);
app.use('/api/articles', articleRoutes);

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/signin");
}

if(process.env.NODE_ENV === 'production'){
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}

module.exports = app;