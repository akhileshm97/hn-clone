import axios from 'axios';
import { SIGNUP, SIGNIN, SIGNOUT } from './types';

export const signUp = newUser => dispatch => {
	axios.post('/api/signup', newUser)
		.then(response => 
			dispatch({
				type: SIGNUP,
				payload: response.data
			})
		)
		.catch(error => {
			console.log(error)
		})	
}

export const signIn = user => dispatch => {
	axios.post('/api/signin', user)
		.then(response => 
			dispatch({
				type: SIGNIN,
				payload: response.data
			})
		)
		.catch(error => {
			console.log(error);
		})
}

export const signOut = () => dispatch => {
	axios.post('/api/signout')
		.then(response => 
			dispatch({
				type: SIGNOUT,
				payload: response.data
			})
		)
		.catch(error => {
			console.log(error);
		})
}
