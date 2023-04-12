import './Register.css';
import { useNavigate } from 'react-router-dom';
import { StyledButton, LoginTextField } from './StyledMuiComponents.js'
  
function Register(props) {
  
  const navigate = useNavigate();
  
  const handleRegisterSubmit = event => {
    
    fetch('https://starcaserver.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: event.target.email.value,
        passwrd: event.target.password.value,
        confirmPassword: event.target.confirm_password.value,
        ufname: event.target.first_name.value,
        ulname: event.target.last_name.value,
        uphnum: event.target.phone_number.value,
        ustreet: event.target.street.value,
        ucity: event.target.city.value,
        ustate: event.target.state.value,
        uzip: event.target.zip.value
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

      fetch(`https://api-${process.env.REACT_APP_SENDBIRD_ID}.sendbird.com/v3/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': `${process.env.REACT_APP_SENDBIRD_API_TOKEN}`
      },
      body: JSON.stringify({
        user_id: event.target.email.value,
        nickname: event.target.first_name.value + " " + event.target.last_name.value,
        profile_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Sendbird User Successfully Created")
      })
      .catch(error => {
        console.log("Error creating Sendbird user: " + error)
      })
      
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
                    <td>
                    <LoginTextField id="last_name" label="Last Name" variant="outlined" />
                    </td>
                    <td>
                    <LoginTextField id="email" label="Email" type="email" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <LoginTextField id="street" label="Street Address" variant="outlined" />
                    </td>
                    <td>
                    <LoginTextField id="city" label="City" variant="outlined" />
                    </td>
                    <td>
                    <LoginTextField id="state" label="State" variant="outlined" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <LoginTextField id="zip" label="Zip Code" variant="outlined" />
                    </td>
                    <td>
                    <LoginTextField id="phone_number" label="Phone Number" type='tel' variant="outlined" />
                    </td>
                  </tr> 
                    <td>
                    <LoginTextField id="password" label="Password" type="password" variant="outlined" />
                    </td>
                  <tr>
                    <td>
                    <LoginTextField id="confirm_password" label="Confirm Password" type="password" variant="outlined" />
                    </td>
                  </tr>
                </tbody>
            </table>
            <StyledButton type="submit" variant="contained">Register</StyledButton>
          </form>
      </div>);
}

export default Register;
