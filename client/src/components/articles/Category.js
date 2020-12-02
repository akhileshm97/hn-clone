import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react';

import { fetchABC } from '../../actions/articleActions';


class Category extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("Category mounted");
    console.log(this.props);
    this.props.fetchABC(this.props.match.params.category);
  }

  render(){
    console.log(this.props.articles);
    return (
      (this.props.articles.length===0) ? 
      <div>No articles currently exist</div>
      :
      <div className="articles">
        <Item.Group divided>
        { this.props.articles.map((article, index) => {
          const { title, lead, category, meta, tags, createdOn, _id } = article;
          return (
            <Item key={index}>
              <Item.Image src='/image.jpg' />
              <Item.Content>
                <Item.Header>
                  <Link to={"/articles/view/"+_id}>{title}</Link>
                </Item.Header>
                <Item.Meta>
                  <span className='cinema'>{createdOn}</span>
                </Item.Meta>
                <Item.Description>{lead}</Item.Description>
                <Item.Extra>
                  <Link to={"/categories/"+category}><Label color="black">{category}</Label></Link>
                  {tags.map((tag, index) => (
                    <Link key={index} to={"/tags/"+tag}><Label color="teal">{tag}</Label></Link>
                  ))}
                </Item.Extra>
                <Item.Extra>
                  <Label>{meta.likes}</Label>
                  <Label>{meta.dislikes}</Label>
                  <Label>{meta.hidden}</Label>
                  <Label icon='globe' content='Additional Languages' />
                  <Link to={"/articles/view/"+_id}>
                    <Button primary floated='right'>
                      View
                      <Icon name='right chevron' />
                    </Button>
                  </Link>
                </Item.Extra>
              </Item.Content>
            </Item>
          )
        })}
        </Item.Group>
      </div>
    )
  }
}

//PropTypes
Category.propTypes = {
  fetchABC: PropTypes.func.isRequired,
  articles: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  currentUser: state.userState.currentUser,
  username: state.userState.username,
  articles: state.articlesState.articles,
  message: state.userState.message
})


export default connect(mapStateToProps, { fetchABC })(Category);
