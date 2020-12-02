import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Radio, Select, TextArea, Header, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { createArticle } from '../../actions/articleActions';

const categories = [
  {
    key: 1,
    text: 'Technology',
    value: 'Technology'
  },
  {
    key: 2,
    text: 'Sports',
    value: 'Sports'
  },
  {
    key: 3,
    text: 'Finance',
    value: 'Finance'
  },
  {
    key: 4,
    text: 'Business',
    value: 'Business'
  },
  {
    key: 5,
    text: 'Science',
    value: 'Science'
  },
  {
    key: 6,
    text: 'Movies',
    value: 'Movies'
  }
]

class CreateArticle extends Component {

	constructor(props) {
		super(props);

		this.state = {
			title: '',
			lead: '',
			description: '',
			tags: [],
			category: ''
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		console.log("CreateArticle mounted");
  	console.log(this.props);
	}

	addTag = () => {this.setState({tags: [...this.state.tags, ""]})}

	removeTag = index => {
		let tags = [ ...this.state.tags ];
		tags.splice(index, 1);
		this.setState({ tags: tags });
	}

	onChange = (e, { name, value }) => {this.setState({ [name]: value })}

	onChangeTag = (e, index) => {
		let tags = this.state.tags;
		tags[index] = e.target.value;
		this.setState({ tags: tags });
	}

	onSubmit = (e) => {
		e.preventDefault();
		console.log(this.state);

		const newArticle = { 
			...this.state,
			author: { 
				id: this.props.currentUser._id, 
				username: this.props.currentUser.username,
				screenname: this.props.currentUser.screenname
			}
		};
		console.log(newArticle);
		
		this.props.createArticle(newArticle);
		this.setState({ title: '', lead: '', description: '', category: '', tags: [] });
		// this.props.history.push('/articles');

		// window.location = '/';
	}

  render(){
    const { title, lead, description, category, tags } = this.state;
    return (
    	<div className="formDiv">
	  		<h3>Add Article</h3>
	  		<Form onSubmit={this.onSubmit}>
          <Form.Field
          	required
            control={Input}
            name="title"
            value={title}
		    		onChange={this.onChange}
            label='Title'
            placeholder='Limit to 20 words'
          />
          <Form.Field
          	required
            control={TextArea}
            name="lead"
		    		value={lead}
		    		onChange={this.onChange}
            label='Lead'
            placeholder='Enter the opening paragraph within 100 words'
          />
          <Form.Field
          	required
	          control={TextArea}
	          name="description"
		    		value={description}
		    		onChange={this.onChange}
	          label='Content'
	          placeholder='Enter the article content within 2000 words'
	        />
          <Form.Field
				    required
				    fluid
            control={Select}
            options={categories}
            name="category"
		    		value={category}
		    		onChange={this.onChange}
            label='Category'
            placeholder='Select Category'
          />

	        {(tags.length == 0) ? null :
	        <Header sub>Tags:</Header>}
			    {tags.map((tag, index) => (
				  <Form.Group key={index} inline>
	    			<Form.Field 
	    				required
	    				control={Input}
			    		value={tag}
			    		onChange={(e) => this.onChangeTag(e, index)}
			    		placeholder="Add a tag"
			    		color="blue"
			    	/>
			    	<Button type="button" color="red" onClick={() => this.removeTag(index)}>Remove</Button>
			    </Form.Group>
			    ))}
		    	
		    	<Button type="button" color="teal" onClick={this.addTag}>Add tag</Button>
          <Button primary type='submit' content='Submit' />
     	  </Form>
     	</div>
    )
  }
}

//PropTypes

CreateArticle.propTypes = {
  createArticle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  username: state.userState.username,
  currentUser: state.userState.currentUser,
})


export default compose(withRouter, connect(mapStateToProps, { createArticle }))(CreateArticle);
