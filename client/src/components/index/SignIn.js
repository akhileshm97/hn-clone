import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { signIn } from '../../actions/userActions';

class SignIn extends Component {

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: ''
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
  	console.log(this.props);
		console.log("SignIn mounted");
	}

	onChange = (e) => {this.setState({ [e.target.name]: e.target.value })}

	onSubmit = (e) => {
		e.preventDefault();
		console.log(this.state);

		const user = this.state;
		console.log(user);

		this.props.signIn(user);

		this.setState({ username: '', password: '' });

		// window.location = '/';
	}

  render(){
    return (
    	<div className="formDiv">
    		<h3>Sign in</h3>
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
				<h6>Don't have an account?</h6>
				<Link to="/signup"><Button color="black" type='button'>Create account</Button></Link>
			</div>
    );
  }
}

//PropTypes

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  username: state.userState.username,
  currentUser: state.userState.currentUser
})

export default connect(mapStateToProps, { signIn })(SignIn);
