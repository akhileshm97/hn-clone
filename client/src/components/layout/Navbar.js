import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'semantic-ui-react';

import { signOut } from '../../actions/userActions';

class Navbar extends Component {

	handleSignOut = () => { this.props.signOut(); }

	checkUser = () => {
		// axios.post('http://localhost:5000/checkuser')
		// 	.then(res => {
		// 		console.log(res.data);
		//		this.setState({user: res.data});
		// 	})
		// 	.catch(error => {
		// 		console.log(error);
		// 	})
		console.log(this.props.currentUser)
	}

	render(){
		const { username, currentUser } = this.props;
		return(
			<React.Fragment>
				<nav id="navbar">
					<div id="navbar-logo">
						<Link style={linkStyle} to="/">Home</Link>
					</div>
					<div id="topbar">
						<div id="topbar-left">
							<ul>
								<li><Link style={linkStyle} to="/premium">Premium</Link></li>
							</ul>		
						</div>
						<div id="topbar-right">
						{(currentUser) ?
							<ul>
								<li><Link style={linkStyle} to={"/"+username}>{username}</Link></li>
								<li><Button type="button" style={linkStyle} onClick = {() => { this.handleSignOut() }}>Sign out</Button></li>
							</ul>
							:
							<ul>
								<li><Link style={linkStyle} to="/signin">Signin</Link></li>
								<li><Link style={linkStyle} to="/signup">Signup</Link></li>
							</ul>
						}
						</div>
					</div>
				</nav>
				<header style={headerStyle}>
					<h1>Hello there</h1>
		      <Link className="linkStyle" to="/">Home</Link>
		      <Link className="linkStyle" to="/dashboard">Dashboard</Link>
		      <Link className="linkStyle" to="/posts">Posts</Link>
		      <Link className="linkStyle" to="/articles">Articles</Link>
		      <Link className="linkStyle" to="/articles/create">New article</Link>
		      <Link className="linkStyle" to="/articles/search">Search</Link>
		      <button type="button"	className="btn" onClick = {() => { this.checkUser() }}>Check User</button>
				</header>				
			</React.Fragment>
		)
	}
}

const linkStyle = {
	color: '#fff',
	textDecoration: 'none'
}
const headerStyle = {
	background: '#333',
	color: '#fff',
	textAlign: 'center',
	padding: '10px'
}

const mapStateToProps = state => ({
  username: state.userState.username,
  currentUser: state.userState.currentUser
})


export default connect(mapStateToProps, { signOut })(Navbar)
