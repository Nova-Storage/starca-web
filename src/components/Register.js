import './Register.css';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { StyledButton, LoginTextField } from './StyledMuiComponents.js'
  
function Register(props) {
  
  const navigate = useNavigate();
  
  const handleRegisterSubmit = event => {
    
    console.log(event.target.email.value);
    console.log(event.target.password.value);
    
    fetch('https://starcaserver.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: event.target.email.value,
        passwrd: event.target.password.value,
        confirmPassword: event.target.confirm_password.value,
        fname: event.target.first_name.value,
        lname: event.target.last_name.value,
        phnum: event.target.phone_number.value
      })
    })
      .then(res => res.text()) //Change from text to json
      .then(json => {
        console.log(json)
        // Get the user's information if authenticated successfully
        if (json === "You have successfully registered!"){
          navigate('/login');
        }
      })
      .catch(error => console.log(error));
      
      event.preventDefault();
      //.then((result) => setData(result.rows))
  };
  
  return (
      <div className='register-container'>
          <h1>Register</h1>
          <form onSubmit={handleRegisterSubmit}>
            <table>
                <tbody>
                  <tr>
                    <td>
                    <LoginTextField id="first_name" label="First Name" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <LoginTextField id="last_name" label="Last Name" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <LoginTextField id="email" label="Email" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <LoginTextField id="phone_number" label="Phone Number" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <LoginTextField id="password" label="Password" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <LoginTextField id="confirm_password" label="Confirm Password" variant="outlined" />
                    </td>
                  </tr>
                </tbody>
            </table>
            <StyledButton type="submit" variant="contained">Register</StyledButton>
          </form>
      </div>);
}

export default Register;