import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Icon, Image, Item, Label, Divider } from 'semantic-ui-react';

import { fetchArticles, deleteArticle } from '../../actions/articleActions';

const ArticleCard = props => {
  const { title, description, _id } = props.article;
  return (
    <div className="articleCard">
      <h4>{title}</h4>
      <p>{description}</p>
      <Link to={"/articles/edit/"+_id}><button className="btn">Edit</button></Link>
      <Link to={"/articles/view/"+_id}><button className="btn">View</button></Link>
      <button className="btn" onClick={() => { console.log(props) }}>wow</button>
      <button className="btn" onClick={() => { props.deleteArticle(_id) }}>Delete</button>
    </div>
  )
}

const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

class Articles extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("Articles mounted");
    this.props.fetchArticles();
    console.log(this.props);
  }

  render(){
    const { articles } = this.props;
    console.log(articles);
    return (
      (articles.length===0) ? 
      <div>No articles currently exist</div>
      :
      <div className="articles">
        <Item.Group divided>
        { articles.map((article, index) => {
          const { title, lead, category, meta, tags, createdOn, _id, author } = article;
          return (
            <Item key={index}>
              <Item.Image src='/image.jpg' />
              <Item.Content>
                <Item.Header>
                  <Link to={"/articles/view/"+_id}>{title}</Link>
                </Item.Header>
                <Item.Meta>
                  <span className='cinema'>{author?.username}</span>
                </Item.Meta>
                <Item.Description>{lead}</Item.Description>
                <Divider />
                <Item.Extra>
                  <Link to={"/categories/"+category}><Label color="black">{category}</Label></Link>
                  <Icon name='circle' size='mini' />
                  {tags.map((tag, index) => (
                    <Link key={index} to={"/tags/"+tag}><Label color="teal">{tag}</Label></Link>
                  ))}
                </Item.Extra>
                <Item.Extra>
                  <Label>{meta?.likes}</Label>
                  <Label>{meta?.dislikes}</Label>
                  <Label>{meta?.hidden}</Label>
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
Articles.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  articles: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  articles: state.articlesState.articles,
  currentUser: state.userState.currentUser,
  username: state.userState.username,
  message: state.userState.message
})


export default connect(mapStateToProps, { fetchArticles, deleteArticle })(Articles);
