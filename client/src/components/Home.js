import React, { Component } from 'react';
import { Link, Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';


// function OptionButton({ children, setCurrentPage, toPage }) {
//   return <button onClick={() => setCurrentPage(toPage)}>{children}</button>;
// }

// class Home extends Component {
//   const [currentPage, setCurrentPage] = React.useState("Home");
//   render() {
//     return (
//       <div className="App">
//   	    <React.Fragment>
//   	  		<h2>Home</h2>
//   	  		<p>This is the home page</p>
//   	  	</React.Fragment>
//         <h1>Current Page is: {currentPage}</h1>

//         <OptionButton setCurrentPage={setCurrentPage} toPage="SelectWorkout">
//           Select Workout
//         </OptionButton>
//         <OptionButton setCurrentPage={setCurrentPage} toPage="CreateWorkout">
//           Create Workout
//         </OptionButton>
//       </div>
//     )
//   }
// }


class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      usersays: ''
    }
  }

  componentDidMount() {
    console.log("Dashboard mounted");
  }

  onChange = (e) => {this.setState({ [e.target.name]: e.target.value })}

  usersays = (e) => {
    e.preventDefault();
    const word = this.state.usersays;
    axios.post('http://localhost:5000/usersays', word)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      })

    this.setState({ username: '', password: '' });
  }

  render(){
    console.log(this.props);
    return (
      <div className="form">
        <button type="button" className="btn" onClick = {() => { this.checkUser() }}>Check User</button>
        <p>Current user is: {this.props.store}</p>

        <form onSubmit={this.usersays} className="form">
          <div className="formInput">
            <input
              required
              type="text"
              name="usersays"
              value={this.state.usersays}
              onChange={this.onChange}
              placeholder="Say something"
              autoFocus
            />
          </div>
          <button type="submit" className="btn">Submit</button>
        </form>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.userState.username,
  currentUser: state.userState.currentUser
})


export default connect(mapStateToProps)(Home);