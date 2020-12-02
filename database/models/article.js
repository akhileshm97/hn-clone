const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String,
		screenname: String
	},
	title: String,
	lead: String,
	description: String,
	tags: [String],
	category: String,
  createdOn: Date,
  meta: {
    likes: Number,
    dislikes:  Number,
	  hidden: Boolean
  }
});

module.exports = mongoose.model("Article", articleSchema);