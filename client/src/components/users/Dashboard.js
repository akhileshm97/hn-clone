import React, { Component } from 'react';
import { Link, Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Dropdown, Grid, Segment } from 'semantic-ui-react'

import { getUser } from '../../actions/userActions';

const options = [
  { key: 1, text: 'One', value: 1 },
  { key: 2, text: 'Two', value: 2 },
  { key: 3, text: 'Three', value: 3 }
]

class Dashboard extends Component {

	// constructor(props) {
	// 	super(props);

	// 	this.state = {
	// 		user: null
	// 	}
	// }

  state = {}

	componentDidMount() {
		console.log("Dashboard mounted");
	}

  handleChange = (e, { value }) => this.setState({ value })

	render(){
		console.log(this.props);
    const { value } = this.state
		return (
			<div>
				<p>Current user is: {this.props.username}</p>
				<Grid columns={2}>
	        <Grid.Column>
	          <Dropdown
	            options={options}
	            placeholder='Choose an option'
	            selection
	            value={value}
		    			onChange={this.handleChange}
	          />
	        </Grid.Column>
	        <Grid.Column>
	          <Segment secondary>
	            <pre>Current value: {value}</pre>
	          </Segment>
	        </Grid.Column>
	      </Grid>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  username: state.userState.username,
  currentUser: state.userState.currentUser
})


export default connect(mapStateToProps)(Dashboard)
