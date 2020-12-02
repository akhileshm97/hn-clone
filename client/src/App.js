import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Posts from './components/Posts';

import Navbar from './components/layout/Navbar';
import Home from './components/Home';
import SignUp from './components/index/SignUp';
import SignIn from './components/index/SignIn';
import Dashboard from './components/users/Dashboard';
import UserProfile from './components/users/UserProfile';
import Articles from './components/articles/Articles';
import Article from './components/articles/Article';
import CreateArticle from './components/articles/CreateArticle';
import EditArticle from './components/articles/EditArticle';
import Category from './components/articles/Category';
import Tag from './components/articles/Tag';
import Search from './components/articles/Search';

// import './App.css';
import './styles.css';

import store from './store';

class App extends Component {

  componentDidMount(){
    console.log("app running");
  }

  render(){
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Route path="/" exact component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/users/:username" component={UserProfile} />
          <Route path="/posts" component={Posts} />
          <Route path="/articles" exact component={Articles} />
          <Route path="/articles/view/:id" component={Article} />
          <Route path="/articles/create" component={CreateArticle} />
          <Route path="/articles/edit/:id" component={EditArticle} />
          <Route path="/categories/:category" component={Category} />
          <Route path="/tags/:tag" component={Tag} />
          <Route path="/search" component={Search} />
        </Router>
      </Provider>
    );
  }
}

export default App;
