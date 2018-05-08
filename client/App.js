import React, { Component } from 'react';
import { render } from 'react-dom';
import Login from './Login'
import MainPage from './MainPage'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      activeSession: false,
      userGroups: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.addGroup = this.addGroup.bind(this);
  }

  addGroup(event) {
    event.preventDefault();  
    let value = document.getElementById('group').value
    let user = this.state.user
    fetch('/add-group', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: user,
        value: value
      })
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      console.log('data coming back from adding a group below')
      console.log(data)
      this.setState(prevState => {
        const newState = prevState;
        newState.userGroups.push(data.group_name)
        return {
          userGroups: newState.userGroups
        }
      })
    })
  }

  handleClick(event) {  
    event.preventDefault();  
    const username = document.getElementById('username').value;
    const password = document.getElementById('pwd').value;
    console.log('username: ' + username + ' , password: ' + password)
    
    if (!username || !password) return false;

    document.getElementById('username').value = null;
    document.getElementById('pwd').value = null;

    const route = (event.target.id === 'log-in' ? '/login' : '/signup');
    console.log(route)

    fetch(route, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username, password: password})
    })
    .then((res) => {
      console.log(res)
      if (res.status < 300 && res.status >= 200) return res.json();
    })
    .then((res) => {
      if (res.message) return console.log(res.message);
      const userGroupsArr = [];
      for (let i = 0; i < res.user.groups.length; i++) {
        userGroupsArr.push(res.user.groups[i].group_name)
      }
      this.setState(prevState => {
        return {
          user: res.user.username,
          activeSession: res.activeSession,
          userGroups: userGroupsArr
        };
      });
    });
  }


  // check whether there is cookie in the browser or not.
  // if not, render Login; if true, render UserMain
  componentDidMount() { 
    // fetch('/verify')
    // .then((res) => {
    //   if (res.status !== 200) return;
    //   return res.json(); // sessionController.verifyUser defines data's structure in its res.send(true)
    // })
    // .then((data) => { 
    //   console.log('session verification result below');
    //   console.log(data)
    //   console.log('session verification result above');
    //   if (data.activeSession) {
    //     let tempState = this.state;
    //     tempState.activeSession = data.activeSession;
    //     tempState.user = data.username;
    //     this.setState(tempState);
    //   }
    // })
  }

  render() {      
    return (
      this.state.activeSession ? 
      <MainPage 
        userGroups={this.state.userGroups}
        addGroup ={this.addGroup} 
      /> 
      : <Login handleClick={this.handleClick}/>
    );
  }
}

module.exports = App