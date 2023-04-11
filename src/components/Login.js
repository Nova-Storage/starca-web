import './Login.css';
import React, { useCallback, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { StyledButton, LoginTextField} from './StyledMuiComponents.js';

function Login(props) {
  
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
          props.authenticated();
          sessionStorage.setItem("email", event.target.email.value);
          navigate('/');
        }
        else {
          //TODO: Make input fields red
        }
      })
      .catch(error => console.log(error));
      //TODO: Get user's info in a state varibale
      //.then((result) => setData(result.rows))
      
      // Stop the form from refreshing the page which would create infinite refreshing
      event.preventDefault();
  };
  
  return (
      <div className='login-container'>
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
