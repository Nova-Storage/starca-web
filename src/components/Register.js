import './Register.css';
import { useNavigate } from 'react-router-dom';
import { StyledButton, RegisterTextField } from './StyledMuiComponents.js'
import {Paper } from '@mui/material'
import { useState } from 'react'
import { CircularProgress } from '@mui/material'

function Register(props) {
  
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false)


  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const [cityError, setCityError] = useState(false)
  const [stateError, setStateError] = useState(false)
  const [zipError, setZipError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confPasswordError, setConfPasswordError] = useState(false)
  const [passwordHelper, setPasswordHelper] = useState("")
  const [confPasswordHelper, setConfPasswordHelper] = useState("")


  

  const handleFieldUpdate = (field) => {
    switch (field) {
      case "fname":
        setFirstNameError(false)
        break;
      case "lname":
        setLastNameError(false)
        break;
      case "email":
        setEmailError(false)
        break;
      case "address":
        setAddressError(false)
        break;
      case "city":
        setCityError(false)
        break;
      case "state":
        setStateError(false)
        break;
      case "zip":
        setZipError(false)
        break;
      case "phone":
        setPhoneError(false)
        break;
      case "pass":
        setPasswordError(false)
        break;
      case "confPass":
        setConfPasswordError(false)
        break;
      default:
        break;
    }
  }

  const handleRegisterSubmit = event => {
    let canSubmit = true
    // Check for empty fields
    if (event.target.email.value === "") {
      setEmailError(true)
      canSubmit = false
    }
    if (event.target.password.value === "") {
      setPasswordError(true)
      setPasswordHelper("Required")
    }
    if (event.target.confirm_password.value === "") {
      setConfPasswordError(true)
      setConfPasswordHelper("Required")
    }
    if (event.target.first_name.value === "") {
      setFirstNameError(true)
    }
    if (event.target.last_name.value === "") {
      setLastNameError(true)
    }
    if (event.target.phone_number.value === "") {
      setPhoneError(true)
    }
    if (event.target.street.value === "") {
      setAddressError(true)
    }
    if (event.target.city.value === "") {
      setCityError(true)
    }
    if (event.target.state.value === "") {
      setStateError(true)
    }
    if (event.target.zip.value === "") {
      setZipError(true)
    }

    // Check passwords match
    if (event.target.password.value !== event.target.confirm_password.value) {
      setPasswordError(true)
      setConfPasswordError(true)
      setPasswordHelper("Passwords must match")
      setConfPasswordHelper("Passwords must match")
    }
    
    // If any errors, do not submit
    else {
      fetch(`${process.env.REACT_APP_BASE_SERVER_URL}/register`, {
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
        .then(res => res.json()) //Change from text to json
        .then(json => {
          // Get the user's information if authenticated successfully
          setIsLoading(true)
          
          if (json['message'] === 'User already exists') {
            // Alert that user already exists using snackbar
            console.log("User Exists")
          }

          if (json['message'] === "You have successfully registered!"){
            window.open(json['account_link_url'], "_self")

            fetch(`https://api-${process.env.REACT_APP_SENDBIRD_ID}.sendbird.com/v3/users`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Api-Token': `${process.env.REACT_APP_SENDBIRD_API_TOKEN}`
              },
              body: JSON.stringify({
                user_id: json['userId'],
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
          }
        })
        .catch(error => console.log(error));
    }
      event.preventDefault();
  };
  
  return (
      <div className='register-container'>
            {isLoading ? 
            <CircularProgress className='circular-progress'/>
            :
            <></>
          }
          <Paper elevation={5} className='registration_paper'>
            <h1>Register</h1>
            <form onSubmit={handleRegisterSubmit}>
              <table>
                  <tbody>
                    <tr>
                      <td>
                        <RegisterTextField id="first_name" label="First Name" variant="outlined" style={{width: '48%'}} error={firstNameError ? true : false} helperText={firstNameError ? "Required" : ""} onChange={(e) => handleFieldUpdate("fname", e)}/>
                        <RegisterTextField id="last_name" label="Last Name" variant="outlined" style={{width: '48%'}} error={lastNameError ? true : false} helperText={lastNameError ? "Required" : ""} onChange={(e) => handleFieldUpdate("lname", e)}/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <RegisterTextField id="email" label="Email" type="email" variant="outlined" error={emailError ? true : false} helperText={emailError ? "Required" : ""} onChange={(e) => handleFieldUpdate("email", e)}/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                      <RegisterTextField id="street" label="Street Address" variant="outlined" error={addressError ? true : false} helperText={addressError ? "Required" : ""} onChange={(e) => handleFieldUpdate("address", e)}/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                      <RegisterTextField id="city" label="City" variant="outlined" error={cityError ? true : false} helperText={cityError ? "Required" : ""} onChange={(e) => handleFieldUpdate("city", e)}/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                      <RegisterTextField id="state" label="State" variant="outlined" error={stateError ? true : false} helperText={stateError ? "Required" : ""} onChange={(e) => handleFieldUpdate("state", e)}/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                      <RegisterTextField id="zip" label="Zip Code" variant="outlined" error={zipError ? true : false} helperText={zipError ? "Required" : ""} onChange={(e) => handleFieldUpdate("zip", e)} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                      <RegisterTextField id="phone_number" label="Phone Number" type='tel' variant="outlined" error={phoneError ? true : false} helperText={phoneError ? "Required" : ""} onChange={(e) => handleFieldUpdate("phone", e)}/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                      <RegisterTextField id="password" label="Password" type="password" variant="outlined" error={passwordError ? true : false} helperText={passwordError ? `${passwordHelper}` : ""} onChange={(e) => handleFieldUpdate("pass", e)}/>
                      </td>
                    </tr> 
                    <tr>
                      <td>
                      <RegisterTextField id="confirm_password" label="Confirm Password" type="password" variant="outlined" error={confPasswordError ? true : false} helperText={confPasswordError ? `${confPasswordHelper}` : ""} onChange={(e) => handleFieldUpdate("confPass", e)}/>
                      </td>
                    </tr>
                  </tbody>
              </table>
              <StyledButton type="submit" variant="contained">Register</StyledButton>
            </form>
          </Paper>
      </div>);
}

export default Register;
