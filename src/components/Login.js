import './Login.css';
import React, { useCallback } from 'react'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const LoginTextField = styled(TextField)(({ theme }) => ({
  width: 300,
  "& label.Mui-focused": {
    color: "#0C825F"
  },
  "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "gray"
      },
      "&:hover fieldset": {
        borderColor: "gray"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#0C825F"
      }
    },
  margin: 10,
  }));
  
const LoginButton = styled(Button)(({ theme }) => ({
  width: 300,
  background: '#0C825F',
  '&:hover': {
       background: "#027251",
    },
  margin: 10,
  }));
  
function Login(props) {
  
  const navigate = useNavigate();
  const handleSubmit = event => {
    //TODO: Call server to check if user exists and retreive their info
    props.authenticated();
    navigate('/');
    // Stop the form from refreshing the page which would create infinite refreshing
    event.preventDefault();
  };
  
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
            <LoginButton type="submit" variant="contained">Login</LoginButton>
          </form>
      </div>);
}

export default Login;