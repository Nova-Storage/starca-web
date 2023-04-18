import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { StyledButton, LoginTextField} from './StyledMuiComponents.js';
import { Snackbar, Alert } from '@mui/material'
import './ForgotPassword.css';

export default function ForgotPassword() {

    // const [invalidEmail, setInvalidEmail] = useState(false)
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const resetPassword = event => {
        fetch(`${process.env.REACT_APP_BASE_SERVER_URL}/forgotPassword`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: event.target.email.value,
              })
            })
            .then(res => res.json())
            .then(json => {
                if (json['message'] === "There is no account with the provided email.") {
                  // Update email to invalid
                  // setInvalidEmail(!invalidEmail)
                  // Display snackbar for 3 seconds
                  setOpen(true)
                  setTimeout(() => {
                      setOpen(false)
                  }, 3000)
                }
                else {
                  // Email to to user to reset password.
                  navigate('/login', { state: { 
                    showSnackbar: true, 
                    message: `An email was sent to ${event.target.email.value}!`  
                  }})
                }
            })
            .catch(error => {
                console.log(error)
            });
            
            event.preventDefault();
        }

    return (
        <div className='forgot-password-grid-container'>
          <div className='forgot-password-form'>
            <h1 style={{marginTop: '20%'}}>Forgot Password</h1>
            <Snackbar 
              open={open}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              autoHideDuration={0}
              >
                  <Alert severity='error'>There is no account with the provided email.</Alert>
              </Snackbar>
            <form onSubmit={resetPassword}>
              <table>
                <tr>
                  <td>
                  <LoginTextField id="email" label="Email" variant="outlined" required/>
                  </td>
                </tr>
              </table>
              <StyledButton type="submit" variant="contained">Submit</StyledButton>
            </form>
            </div>
          </div>
    )    
}
