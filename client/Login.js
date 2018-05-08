import React, { Component } from 'react';
import { render } from 'react-dom';

// Presentation component function
const Login = (props) => {
  return (
    <div id='login'>
      <h2>Groupur</h2>
      <h3>Join other buyers for saving</h3>
      <input className='input' id='username' type='text' placeholder='Username'/>
      <input className='input' id='pwd' type='password' placeholder='Password'/>
      <button className='login-button' id='log-in' type='submit' onClick={props.handleClick}>
        Log in
      </button>
      <button className='login-button' id='sign-in' type='submit' onClick={props.handleClick}>
        Sign up
      </button> 
    </div>
  );
}

module.exports = Login