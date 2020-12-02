const express = require("express");
const router = express.Router();
const cors = require('cors');

const articleHelper = require('../helpers/articleHelper')

router.route('/')
	.get(articleHelper.fetchArticles)
	.post(articleHelper.createArticle);

router.route('/:id')
	.get(articleHelper.fetchArticle)
	.put(articleHelper.updateArticle)
	.delete(articleHelper.deleteArticle);
router.route('/update/:id').post(articleHelper.ua);

router.route('/users/:username').get(articleHelper.fetchUser);

router.route('/categories/:category').get(articleHelper.fetchCategory);

router.route('/tags/:tag').get(articleHelper.fetchTag);

router.route('/:id/like').post(articleHelper.likeArticle);

router.route('/:id/dislike').post(articleHelper.dislikeArticle);


module.exports = router;