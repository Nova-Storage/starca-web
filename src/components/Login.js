import './Login.css';
import React, { useCallback, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { StyledButton, LoginTextField} from './StyledMuiComponents.js';

function Login(props) {
  
  /*
  fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))*/
  /*
  useEffect (() => {
    
       fetch('https://jsonplaceholder.typicode.com/todos/1', {
        method: 'GET',
        })
      .then((response) => response.json())
      .then(json => console.log(json))
      .catch(error => console.log(error));
  });*/
  
  const navigate = useNavigate();
  const handleSubmit = event => {
    //TODO: Call server to check if user exists and retreive their info
    props.authenticated();
    navigate('/');
    // Stop the form from refreshing the page which would create infinite refreshing
    event.preventDefault();
  };
  
  const handleSignUp = event => {
    navigate('/register');
    event.preventDefault();
  }
  
  
  const authenticateUser = event => {
    
    console.log(event.target.email.value);
    console.log(event.target.password.value);
    fetch('https://starcaserver.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: event.target.email.value,
        passwrd: event.target.password.value
      })
    })
      .then(res => res.text()) //Change from text to json
      .then(json => {
        console.log(json)
        // Get the user's information if authenticated successfully
        if (json === "You Logged in.!"){
          props.authenticated()
        }
      })
      .catch(error => console.log(error));
      event.preventDefault();
      //.then((result) => setData(result.rows))
      
      
      /*
      fetch('https://starcaserver.com/')
      .then((response) => response.text())
      .then((text) => console.log(text));
      event.preventDefault();
      */
  };
  
  return (
      <div>
          <h1>Login</h1>
          <form onSubmit={authenticateUser}>
            <table>
              <tr>
                <td>
                <LoginTextField id="email" label="Email" variant="outlined" />
                </td>
              </tr>
              <tr>
                <td>
                <LoginTextField id="password" label="Password" variant="outlined" />
                </td>
              </tr>
            </table>
            <StyledButton type="submit" variant="contained">Login</StyledButton>
          </form>
          <p>Don't have an account yet? <a className="register-link" onClick={handleSignUp}>Sign up</a></p>
      </div>);
}

export default Login;