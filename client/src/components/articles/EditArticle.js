import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Radio, Select, TextArea, Header } from 'semantic-ui-react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { fetchArticle, updateArticle } from '../../actions/articleActions';

class EditArticle extends Component {

	constructor(props) {
		super(props);

		this.state = {
			title: '',
			lead: '',
			description: '',
			tags: []
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		console.log("CreateArticle mounted");
		console.log(this.props);
		
		// let result = await 
    this.props.fetchArticle(this.props.match.params.id);
		if(Object.keys(this.props.article).length === 0){
			console.log("hahahha");
		} else {
			this.setState({
				title: this.props.article.title,
				lead: this.props.article.lead,
				description: this.props.article.description,
				tags: this.props.article.tags
			})
		}

		// axios.get('http://localhost:5000/articles/'+this.props.match.params.id)
		// 	.then(response => {
		// 		this.setState({
		// 			title: response.data.title,
		// 			description: response.data.description,
		// 			tags: response.data.tags
		// 		})
		// 	})
		// 	.catch(error => console.log(error))
	}

	addTag = () => { this.setState({tags: [...this.state.tags, ""]}) }

	removeTag = (index) => {
		let tags = this.state.tags;
		tags.splice(index, 1);
		this.setState({ tags: tags });
	}

	onChange = (e) => {this.setState({ [e.target.name]: e.target.value })}

	onChangeTag = (e, index) => {
		let tags = this.state.tags;
		tags[index] = e.target.value;
		this.setState({ tags: tags });
	}
	
	onSubmit = (e) => {
		e.preventDefault();
		console.log(this.state);

		const updatedArticle = this.state;
		console.log(updatedArticle);

		this.props.updateArticle(updatedArticle, this.props.match.params.id);
		this.props.history.push('/articles');

    // window.location = '/';
	}

  render(){
  	console.log(this.props);
    const { title, lead, description, tags } = this.state;
    return (
    	(Object.keys(this.props.article)===0) ? null :
    	<div className="formDiv">
	  		<h3>Edit Article</h3>
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
            control={Input}
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
	        {(tags.length == 0) ? null :
	        <Header sub>Tags:</Header>}
			    {this.state.tags.map((tag, index) => (
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
		    	<Button type="button" onClick={this.addTag}>Add tag</Button>
          <Button type='submit' content='Submit' />
     	  </Form>
     	</div>
    )
  }
}

//PropTypes

EditArticle.propTypes = {
  updateArticle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  currentUser: state.userState.currentUser,
  username: state.userState.username,
  article: state.articlesState.article
})


export default compose(withRouter, connect(mapStateToProps, { fetchArticle, updateArticle }))(EditArticle);