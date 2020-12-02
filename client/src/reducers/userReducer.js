import { SIGNUP, SIGNIN, SIGNOUT } from '../actions/types';

const initialState = {
	currentUser: null,
	username: '',
	loggedIn: false,
	userFound: false,
	message: '',
	locals: {}
}

export default function(state = initialState, action) {
	switch(action.type) {
		case SIGNUP:
			return {
				...state,
				currentUser: action.payload.currentUser,
				username: action.payload.currentUser.username,
				loggedIn: action.payload.loggedIn,
				message: action.payload.message
			}
		case SIGNIN:
			return {
				...state,
				currentUser: action.payload.currentUser,
				username: action.payload.currentUser.username,
				loggedIn: action.payload.loggedIn,
				userFound: action.payload.userFound,
				message: action.payload.message
			}
		case SIGNOUT:
			return {
				...state,
				currentUser: action.payload.currentUser,
				username: action.payload.username,
				loggedIn: action.payload.loggedIn,
				message: action.payload.message
			}
		default:
			return state;
	}
}