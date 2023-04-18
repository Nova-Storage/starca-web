import { StyledButton, LoginTextField} from './StyledMuiComponents.js';
import { 
    useState,
    useEffect
} from 'react'
import { Snackbar, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {

    // Password state variables
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(true)
    const [open, setOpen] = useState(false)

    // URL Param state variables
    const [token, setToken] = useState(null)
    const [email, setEmail] = useState(null)
    const [tokenExp, setTokenExp] = useState(null)
    const [tokenValid, setTokenValid] = useState(true)
    const [currentTime, setCurrentTime] = useState(null)


    const navigate = useNavigate();

    // Get the params from the URL.
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)

        if (urlParams.has('token')) {
            setToken(urlParams.get('token'));
        }
        if (urlParams.has('email')) {
            setEmail(urlParams.get('email'));
        }
        if (urlParams.has('exp')) {
            setTokenExp(new Date(urlParams.get('exp')));
        }

        setCurrentTime(new Date())
    }, [])

    useEffect(() => {
        if (currentTime !== null && tokenExp !== null) {
            if (currentTime > tokenExp) {
                setTokenValid(!setTokenValid)
            }
        }
    }, [tokenExp, currentTime, tokenValid])

    const updatePassword = (event) => {
        // Passwords Do Not Match. Alert the user and do not let them submit
        if (!passwordMatch) {
            setOpen(true)
            setTimeout(() => {
                setOpen(false)
            }, 3000)
        }
        // Passwords match, allow reset
        else {
            fetch(`http://localhost:3000/resetPassword`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    token: token,
                    passwrd: newPassword
                })
                })
                .then(res => res.json())
                .then(json => {
                    // if (json['message'] === "There is no account with the provided email.") {
                    //     // Do whatever
                    // }
                    // else {
                    //     // Do whatever
                    // }
                })
                .catch(error => {
                    console.log(error)
            });
            navigate('/login', { state: { 
                showSnackbar: true,
                message: `Password reset! Please login again.`
            }})
        }
        event.preventDefault()
    }

    // Check if the passwords match.
    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value)
        setPasswordMatch(event.target.value === confirmPassword)
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value)
        setPasswordMatch(event.target.value === newPassword)
    }

    // Error Retrieving the times. Display Something
    if (currentTime === null || tokenExp === null) {
        return
    }

    // Token does not match token in DB, Display something
    else if (!tokenValid) {
        return
    }

    return (
        <div className='login-grid-container'>
          <div>
            <Snackbar 
            open={open}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={0}
            >
                <Alert severity='error'>Passwords do not match!</Alert>
            </Snackbar>
            <h1 style={{marginTop: '20%'}}>Update password</h1>
            <form onSubmit={updatePassword}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <LoginTextField id="newPassword" label="New Password" variant="outlined" required onChange={handleNewPasswordChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <LoginTextField id="confirmPassword" label="Confirm Password" variant="outlined" required onChange={handleConfirmPasswordChange}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                    <StyledButton type="submit" variant="contained">Update Password</StyledButton>
                </form>
                {passwordMatch ? <p></p> : <p style={{color: 'red'}}>Passwords Do Not Match</p>}
            </div>
          </div>
    ) 
}
