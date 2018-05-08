import React, { Component } from 'react';
import { render } from 'react-dom';

// props being passed down from parent. 
// information is being saved on the client side currently. Nothing is being passed from server. 

const MainPage = (props) => {
  // const groupsArr = [];
  // for (let i = 0; i < props.userGroups.length; i++) {
  //   const newLI = document.createElement('li');
  //   const newText = document.createTextNode(props.userGroups[i]);
  //   newLI.appendChild(newText);
  //   groupsArr.push(newLI)
  // }
  const groupsArr = props.userGroups.map((group, i) => <li key={i}>{group}</li>)
  return (
    // initial header
    <div id='main-page'>
      <div className='header'>
        <h3> Groupur </h3>
        {/* <a className='icon' href='/profile'><img src='client/icons/profile.png'/></a>
        <a className='icon' href='/'><img src='client/icons/logout.png'/></a> */}
      </div>

      <div className='main'>
        <div className='user-main'>
          <h3>Your Groups</h3>
          <div className='frame'>
            <form> 
              <input id='group' type='text' name='GroupInput' placeholder='Enter name here'/> 
              <input type='submit' onClick={props.addGroup}/> 
            </form>
            <ul id='user-group-list'>          
              { 
                groupsArr
                /* 
                pass down action from app. Update the state and refresh
                query and list data from database. On each group, add a button that allows for deletion. 
                When button is pressed, delete the group from the database. Update the displayed group under your group. 
                */
              }
            </ul>
          </div>
        </div>

        <div className='groups-main'>
          <h3> Groups Available </h3>
          <div className='frame'>
            <ul id='groupsList'>
              <li><button className='userGroup' href='#'>{props.allGroups}</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}  

 // four divs. There is a main div with three nested children (your groups / groups available / footer)
 // each div has additional nesting.. -_-.  

module.exports = MainPage

 // <div className='col-md-12 footer'>
 //          <ul className='list' id='footerList'>
 //            <li><a className='list' href='#'>ABOUT US</a></li>
 //            <li><a className='list' href='#'>SUPPORT</a></li>
 //            <li><a className='list' href='#'>BLOG</a></li>
 //            <li><a className='list' href='#'>JOBS</a></li>
 //            <li><a className='list' href='#'>PRIVACY</a></li>
 //            <li><a className='list' href='#'>TERMS</a></li>
 //            <li><a className='list' href='#'>DIRECTORY</a></li>
 //            <li><a className='list' href='#'>LANGUAGE</a></li>
 //          </ul>
 //        </div>