import './Login.css';
import React, { useCallback } from 'react'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { StyledButton, LoginTextField} from './StyledMuiComponents.js';
  
function Login(props) {
  
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
  
  return (
      <div>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <table>
              <tr>
                <td>
                <LoginTextField id="outlined-basic" label="Email" variant="outlined" />
                </td>
              </tr>
              <tr>
                <td>
                <LoginTextField id="outlined-basic" label="Password" variant="outlined" />
                </td>
              </tr>
            </table>
            <StyledButton type="submit" variant="contained">Login</StyledButton>
          </form>
          <p>Don't have an account yet? <a className="register-link" onClick={handleSignUp}>Sign up</a></p>
      </div>);
}

export default Login;