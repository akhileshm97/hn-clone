import React, { Component } from 'react';
import { Link, Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { signUp } from '../../actions/userActions';

class SignUp extends Component {

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			redirectTo: null
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		console.log("SignUp mounted");
	}

	onChange = (e) => {this.setState({ [e.target.name]: e.target.value })}

	onSubmit = (e) => {
		e.preventDefault();
		console.log(this.state);

		const newUser = {
			username: this.state.username,
			password: this.state.password
		}
		console.log(newUser);

		this.props.signUp(newUser);
		console.log(this.props);

		this.setState({ username: '', password: '' });

		// window.location = '/';
	}

  render(){
  	console.log(this.props);
  	if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
    return (
    	<div className="formDiv">
    		<h3>Sign up</h3>
	    	<Form onSubmit={this.onSubmit} className="form">
		    	<Form.Field
		    		required
		    		autoFocus
		    		control={Input}
		    		name="username"
		    		value={this.state.username}
		    		onChange={this.onChange}
		    		label='Username'
		    		placeholder="Enter your username"
		    	/>
			    <Form.Field
		    		required
		    		control={Input}
		    		type="password"
		    		name="password"
		    		value={this.state.password}
		    		onChange={this.onChange}
		    		label='Password'
		    		placeholder="Enter your password"
			    />
			    <Button primary type='submit' content='Submit' />
				</Form>
				<h6>Already have an account?</h6>
				<Link to="/signin"><Button color="black" type='button'>Sign in</Button></Link>
			</div>
    );
  }
}

//PropTypes

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  username: state.userState.username,
  currentUser: state.userState.currentUser,
  message: state.userState.message
})


export default connect(mapStateToProps, { signUp })(SignUp);
