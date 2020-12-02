import axios from 'axios';
import { 
	FETCH_ARTICLES,
	CREATE_ARTICLE,
	FETCH_ARTICLE,
	UPDATE_ARTICLE,
	DELETE_ARTICLE,
	LIKE_ARTICLE,
	DISLIKE_ARTICLE,
	FETCH_USER,
	FETCH_ABU,
	FETCH_ABC,
	FETCH_ABT
} from './types';

export const fetchArticles = () => dispatch => {
	axios.get('/api/articles')
		.then(response => 
			dispatch({
				type: FETCH_ARTICLES,
				payload: response.data
			})
		)
		.catch(error => {
			console.log(error)
		})	
}

export const createArticle = newArticleData => dispatch => {
	axios.post('/api/articles', newArticleData)
		.then(response => 
			dispatch({
				type: CREATE_ARTICLE,
				payload: response.data
			})
		)
		.catch(error => {
			console.log(error);
		})
}

export const fetchArticle = id => dispatch => {
	axios.get('/api/articles/' + id)
		.then(response => 
			dispatch({
				type: FETCH_ARTICLE,
				payload: response.data
			})
		)
		.catch(error => {
			console.log(error)
		})	
}

// export const updateArticle = (updatedArticle, id) => dispatch => {
// 	axios.post('/api/articles/update/'+id, updatedArticle)
// 		.then(response => 
// 			dispatch({
// 				type: UPDATE_ARTICLE,
// 				payload: response.data
// 			})
// 		)
// 		.catch(error => {
// 			console.log(error);
// 		})
// }

export const updateArticle = (updatedArticle, id) => dispatch => {
	axios.put('/api/articles/'+id, updatedArticle)
		.then(response => 
			dispatch({
				type: UPDATE_ARTICLE,
				payload: response.data
			})
		)
		.catch(error => {
			console.log(error);
		})
}

export const deleteArticle = id => dispatch => {
  axios.delete('/api/articles/'+id)
    .then(response => 
    	dispatch({
      	type: DELETE_ARTICLE,
				payload: response.data
    	})
    )
    .catch(error => {
			console.log(error);
		})
}

export const likeArticle = (id, userId) => dispatch => {
  axios.post('/api/articles/'+id+'/like')
    .then(response => 
    	dispatch({
      	type: LIKE_ARTICLE,
				payload: response.data
    	})
    )
    .catch(error => {
			console.log(error);
		})
}

export const dislikeArticle = (id, userId) => dispatch => {
  axios.post('/api/articles/'+id+'/dislike')
    .then(response => 
    	dispatch({
      	type: DISLIKE_ARTICLE,
				payload: response.data
    	})
    )
    .catch(error => {
			console.log(error);
		})
}

export const fetchABU = username => dispatch => {
	axios.get('/api/articles/users/'+username)
		.then(response => 
			dispatch({
				type: FETCH_ABU,
				payload: response.data
			})
		)
		.catch(error => {
			console.log(error)
		})	
}

export const fetchABC = category => dispatch => {
	axios.get('/api/articles/categories/'+category)
		.then(response => 
			dispatch({
				type: FETCH_ABC,
				payload: response.data
			})
		)
		.catch(error => {
			console.log(error)
		})	
}

export const fetchABT = tag => dispatch => {
	axios.get('/api/articles/tags/'+tag)
		.then(response => 
			dispatch({
				type: FETCH_ABT,
				payload: response.data
			})
		)
		.catch(error => {
			console.log(error)
		})	
}