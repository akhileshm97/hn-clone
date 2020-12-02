const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	screenname: String,
  articles: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Article"
		}
  ],
  likedArticles: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Article"
		}
  ],
  dislikedArticles: [
	  {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Article"
		}
	]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);