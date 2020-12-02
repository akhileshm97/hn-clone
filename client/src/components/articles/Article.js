import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Header, Button, Icon, Image, Item, Label, Divider } from 'semantic-ui-react';

import { fetchArticle, deleteArticle, likeArticle, dislikeArticle } from '../../actions/articleActions';

// <p>{tags.join(",")}</p>


const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

class Article extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("Article mounted");
    this.props.fetchArticle(this.props.match.params.id);
    console.log(this.props);
  }

  // likeArticle = () => {
  //   console.log("liked");
  //   document.getElementById("b1").classList.toggle("black");
  //   }

  // dislikeArticle = () => {
  //   console.log("disliked");
  //   document.getElementById("b2").classList.toggle("black");
  //   }

  render(){
    console.log(this.props);
    let { article } = this.props;
    let { title, lead, description, meta, tags, createdOn, _id, author } = article;
    let { currentUser } = this.props;
    return (
      (Object.keys(article).length === 0) ? null :

      <Container text className="article">
        <Header size='huge'>{title}</Header>
        <div>
          <Header sub>Posted on</Header>
          <span>{createdOn}</span>
        </div>
        <div className="vmargin">
          <Link to={"/users/"+author.username}>
            <Header as='h4' style={{display: "inline-block"}}>
              <Image src='/avatar.jpg' avatar /> {author.username}
            </Header>
          </Link>
        </div>
        <Divider />

        { (currentUser && Object.is(author.id, currentUser._id)) ? 
        <div className="options">
          <Link to={"/articles/edit/"+_id}><Button color='blue'>Edit</Button></Link>
          <Button onClick={() => {console.log(this.props)}}>wow</Button>
          <Button color='red' onClick={() => { this.props.deleteArticle(_id) }}>Delete</Button>
          <Divider />
        </div>
        : null
        }

        <div className="articleData">
          <span>Tags: </span>
          {tags.map((tag, index) => (
            <Link key={index} to={"/tags/"+tag} className="tag"><Label color="teal">{tag}</Label></Link>
          ))}
          <Button.Group floated='right'>
            <Button as='div' labelPosition='right' >
              <Button id="b1" onClick={() => {this.props.likeArticle(_id)}}>
                <Icon name='thumbs up' />
              </Button>
              <Label basic pointing='left'>
                {meta.likes}
              </Label>
            </Button>
            <Button as='div' labelPosition='right'>
              <Button id="b2" onClick={() => {this.props.dislikeArticle(_id)}}>
                <Icon name='thumbs down' />
              </Button>
              <Label basic pointing='left'>
                {meta.dislikes}
              </Label>
            </Button>
          </Button.Group>
        </div>

        <Divider />
        <Header size='small'>{lead}</Header>
        <Image src='/image.jpg' centered style={{margin: '40px auto'}} />
        <p>{description}</p>
      </Container>
    )
  }
}

//PropTypes
Article.propTypes = {
  fetchArticle: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  username: state.userState.username,
  currentUser: state.userState.currentUser,
  message: state.userState.message,
  article: state.articlesState.article
})


export default connect(mapStateToProps, { fetchArticle, deleteArticle, likeArticle, dislikeArticle })(Article);
// export default compose(withRouter, connect(mapStateToProps, { updateArticle }))(EditArticle);
