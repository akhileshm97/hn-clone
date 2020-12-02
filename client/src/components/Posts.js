import React, { Component } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';


class Posts extends Component {

  constructor(props) {
    super(props);

    this.state = {posts: []}
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then(res => this.setState({posts: res.data}))
      .catch(error => console.log(error))
  }

  handleClick = () => {
    console.log(this);
  }

  render(){
    const postItems = this.state.posts.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));

    return (
      <div className="posts">
        <h2>Posts</h2>
        <button type="button" onClick={this.handleClick}>Click Me</button>
        {postItems}
      </div>
    )
  }
}

//PropTypes

export default Posts