import { FETCH_USER, FETCH_ARTICLES, FETCH_ABU, FETCH_ABC, FETCH_ABT, FETCH_ARTICLE, CREATE_ARTICLE, UPDATE_ARTICLE, DELETE_ARTICLE, LIKE_ARTICLE, DISLIKE_ARTICLE } from '../actions/types';

const initialState = {
	articles: [],
	article: {},
	message: ''
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_USER:
			return {
				...state,
				articles: action.payload.articles,
				message: action.payload.message
			}
		case FETCH_ARTICLES:
			return {
				...state,
				articles: action.payload.articles,
				message: action.payload.message
			}
		case FETCH_ABU:
			return {
				...state,
				articles: action.payload.articles,
				message: action.payload.message
			}
		case FETCH_ABC:
			return {
				...state,
				articles: action.payload.articles,
				message: action.payload.message
			}
		case FETCH_ABT:
			return {
				...state,
				articles: action.payload.articles,
				message: action.payload.message
			}
		case FETCH_ARTICLE:
			return {
				...state,
				article: action.payload.article,
				message: action.payload.message
			}
		case CREATE_ARTICLE:
			return {
				...state,
				message: action.payload.message
			}
		case UPDATE_ARTICLE:
			return {
				...state,
				message: action.payload.message
			}
		case DELETE_ARTICLE:
			return {
				...state,
				articles: action.payload.articles,
				message: action.payload.message
			}
		case LIKE_ARTICLE:
			return {
				...state,
				message: action.payload.message
			}
		case DISLIKE_ARTICLE:
			return {
				...state,
				message: action.payload.message
			}
		default:
			return state;
	}
}