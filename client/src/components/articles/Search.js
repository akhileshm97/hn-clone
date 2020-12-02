import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Checkbox, Form, Input, Radio, Select, TextArea, Header } from 'semantic-ui-react';
import axios from 'axios';
// import PropTypes from 'prop-types';

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      term: ''       
    }
  }

  componentDidMount() {
    console.log("Search loaded");
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);

    this.setState({ term: '' });

    // window.location = '/';
  }

  render(){
    return (
      <div className="formDiv">
        <h3>Search for articles</h3>
        <form onSubmit={this.onSubmit} className="form">
          <div className="formInput">
            <input
              type="text"
              name="term"
              placeholder="Enter a search term"
              value={this.state.term}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

//PropTypes

export default Search