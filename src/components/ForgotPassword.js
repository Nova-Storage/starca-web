import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { StyledButton, LoginTextField} from './StyledMuiComponents.js';

export default function ForgotPassword() {

    const [invalidEmail, setInvalidEmail] = useState(false)

    const navigate = useNavigate()

    const resetPassword = event => {
        fetch(`http://localhost:3000/forgotPassword`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: event.target.email.value,
              })
            })
            .then(res => res.text())
            .then(json => {
                // console.log(json)
                if (json === "An account with that email does not exist.") {
                    setInvalidEmail(!invalidEmail)
                    console.log("Invalid Email")
                }
                else {
                    // Send email to to user to reset password.
                }
            })
            .catch(error => {
                console.log(error)
            });
            
            event.preventDefault();
        }

    return (
        <div className='login-grid-container'>
          <div>
          <h1 style={{marginTop: '20%'}}>Forgot Password</h1>
          <form onSubmit={resetPassword}>
            <table>
              <tr>
                <td>
                <LoginTextField id="email" label="Email" variant="outlined" />
                </td>
              </tr>
            </table>
            <StyledButton type="submit" variant="contained">Submit</StyledButton>
          </form>
          </div>
          </div>
    )    
}
