import './Register.css';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { StyledButton, LoginTextField } from './StyledMuiComponents.js'
  
function Register(props) {
  
  const navigate = useNavigate();
  const handleSubmit = event => {
    //TODO: Call server to create a new account
    navigate('/login');
    // Stop the form from refreshing the page which would create infinite refreshing
    event.preventDefault();
  };
  
  return (
      <div>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <table>
                <tbody>
                  <tr>
                    <td>
                    <LoginTextField id="first-name" label="First Name" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <LoginTextField id="last-name" label="Last Name" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <LoginTextField id="email" label="Email" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <LoginTextField id="phone-number" label="Phone Number" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <LoginTextField id="password" label="Password" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <LoginTextField id="confirm-password" label="Confirm Password" variant="outlined" />
                    </td>
                  </tr>
                </tbody>
            </table>
            <StyledButton type="submit" variant="contained">Register</StyledButton>
          </form>
      </div>);
}

export default Register;