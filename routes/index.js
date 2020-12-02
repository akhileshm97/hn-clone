const express = require("express");
const router = express.Router();
const cors = require('cors');
const indexHelper = require('../helpers/indexHelper')

router.route('/test')
	.get(indexHelper.getTest)
	.post(indexHelper.postTest);

router.route("/signup").post(indexHelper.signUp);

router.route("/signin").post(indexHelper.signIn);

router.route("/signout").post(indexHelper.signOut);

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.json({ loggedIn: false });
}


module.exports = router;