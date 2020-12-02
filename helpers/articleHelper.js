const Article = require('../database/models/article');
const User = require('../database/models/user');

// ======================================================================================== //

exports.fetchArticles = (req, res) => {
	Article.find({})
		.then(articles => { console.log(articles); res.json({articles, message: "Here are the articles"}) })
		.catch(err => { res.status(400).json('Error: ' + err) })
}

exports.createArticle = (req, res) => {
	Article.create(
		{ ...req.body,
			createdOn: new Date,
			meta: {
				likes: 0,
				dislikes:  0,
				hidden: false
			}
		})
		.then(newArticle => { 
			newArticle.save();
			res.status(201).json({newArticle, message: 'Article created'}) 
		})
		.catch(err => res.status(400).json('Error: ' + err))
}

// ======================================================================================== //

exports.fetchArticle = (req, res) => {
	Article.findById(req.params.id)
		.then(article => { res.json({article, message: "Here is the article"}) })
		.catch(err => res.status(400).json('Error: ' + err))
}

exports.updateArticle = (req, res) => {
	Article.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
		.then(article => { res.json(article) })
		.catch(error => { res.send(error) })
}

exports.ua = (req, res) => {
	Article.findByIdAndUpdate(req.params.id, req.body)
		.then(updatedArticle => res.json({message: "Article updated"}))
		.catch(err => res.status(400).json('Error: ' + err))
}

exports.deleteArticle = (req, res) => {
	Article.findByIdAndDelete(req.params.id)
		.then(() => {
			Article.find({})
				.then(articles => res.json({articles, message: "Deleted the article"}))
		})
		.catch(err => { res.status(400).json('Error: ' + err) })
}

// ======================================================================================== //

exports.likeArticle = (req, res) => {
	console.log('liked');
	res.json({message: 'liked'})
}

exports.dislikeArticle = (req, res) => {
	console.log('disliked');
	res.json({message: 'disliked'})
}

// ======================================================================================== //

exports.fetchUser = (req, res) => {
	console.log(req.params);
	Article.find({ 'author.username': req.params.username})
		.then(articles => {res.json({articles, message: `Here are the articles by ${req.params.username}`})})
		.catch(err => res.status(400).json('Error: ' + err))
}

exports.fetchCategory = (req, res) => {
	console.log(req.params);
	Article.find({category: req.params.category})
		.then(articles => res.json({articles, message: "Here are the articles of the category"}))
		.catch(err => res.status(400).json('Error: ' + err))
}

exports.fetchTag = (req, res) => {
	console.log(req.params);
	Article.find({tags: req.params.tag})
		.then(articles => res.json({articles, message: "Here are the articles with the tag"}))
		.catch(err => res.status(400).json('Error: ' + err))
}

// ======================================================================================== //
