import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios'

// {(!currentUser) ? <span>No user</span> : <span>{currentUser.username}</span>}

class Header extends Component {


	render(){
		return (

		)
	}
}



const mapStateToProps = state => ({
  username: state.userState.username,
  currentUser: state.userState.currentUser,
})


export default connect(mapStateToProps)(Header);