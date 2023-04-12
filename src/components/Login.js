import './Login.css';
import React, { useCallback, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { StyledButton, LoginTextField, StyledPasswordFormControl} from './StyledMuiComponents.js';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import starcaLogo from '../images/starca-logo-icon.png';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import CircleIcon from '@mui/icons-material/Circle';

function Login(props) {

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
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
  
  //TODO: Remove the h1 inline style and make the entire left side center vertically with grid
  return (
      <div className='login-grid-container'>
          <div>
          <h1 style={{marginTop: '20%'}}>Login</h1>
          <h2>Welcome back</h2>
          <p>Rent your space or declutter your place!</p>
          <form onSubmit={authenticateUser}>
            <table>
              <tr>
                <td>
                <LoginTextField id="email" label="Email" variant="outlined" />
                </td>
              </tr>
              <tr>
                <td>
                <StyledPasswordFormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </StyledPasswordFormControl>
                </td>
              </tr>
            </table>
            <StyledButton type="submit" variant="contained">Login</StyledButton>
          </form>
          <p>Don't have an account yet? <a className="register-link" onClick={handleSignUp}>Sign up</a></p>
          </div>
          <div>
            <Carousel animationHandler='fade' autoPlay='true' interval='4000' infiniteLoop='true' showThumbs={false} showStatus={false} renderIndicator={(onClickHandler, isSelected, index, label) => {
              const defStyle = { marginLeft: 20, color: "lightgray", cursor: "pointer" };
              const style = isSelected
                ? { ...defStyle, color: "#0C825F" }
                : { ...defStyle };
              return (
                <span
                  style={style}
                  onClick={onClickHandler}
                  onKeyDown={onClickHandler}
                  value={index}
                  key={index}
                  role="button"
                  tabIndex={0}
                  aria-label={`${label} ${index + 1}`}
                >
                  {<CircleIcon fontSize='12px'/>}
                </span>
              );
            }}>
                  <div>
                      <img src="https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" />
                      <p className="legend">Legend 1</p>
                  </div>
                  <div>
                      <img src="https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80" />
                      <p className="legend">Legend 2</p>
                  </div>
                  <div>
                      <img src="https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" />
                      <p className="legend">Legend 3</p>
                  </div>
              </Carousel>
          </div>
      </div>);
}

export default Login;

const fadeImages = [
  {
    url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    caption: 'First Slide'
  },
  {
    url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
    caption: 'Second Slide'
  },
  {
    url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    caption: 'Third Slide'
  },
];
