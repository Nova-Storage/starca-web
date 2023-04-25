import React, { useState, useEffect, useMemo } from "react";
import "./Profile.css";
import image1 from './image1.jpeg';
import image2 from './image2.jpeg';
import image3 from './image3.jpeg';
import profilepic from './profile.jpeg'
import image4 from './image4.jpeg'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Rating from '@mui/material/Rating';
import { StyledButton, RegisterTextField } from './StyledMuiComponents.js'
import { Snackbar, Alert } from '@mui/material'





const Profile = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)

  const [currentImage, setCurrentImage] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(4); // added rating state
  const [showListings, setShowListings] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("No bio.");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [profilePicture, setProfilePicture] = useState();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [formValues, setFormValues] = useState({
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
    phone_number: '',
    bio: '',
    city: '',
    street: '',
    state: '',
    zip: '',
  })


  const images = useMemo(() => [image1, image2, image3], []);

  const handleInputChange = (event) => {
    const {name, value} = event.target
    if (name === 'first_name' && value !== firstName) {
      setFirstName(value);
    } else if (name === 'last_name' && value !== lastName) {
      setLastName(value);
    } else if (name === 'password' && value !== lastName) {
      setPassword(value);
    } else if (name === 'confirm_password' && value !== lastName) {
      setConfirmPassword(value);
    } else if (name === 'phone_number' && value !== phoneNumber) {
      setPhoneNumber(value);
    } else if (name === 'bio' && value !== bio) {
      setBio(value);
    } else if (name === 'street' && value !== street) {
      setStreet(value);
    } else if (name === 'city' && value !== city) {
      setCity(value);
    } else if (name === 'state' && value !== state) {
      setState(value);
    } else if (name === 'zip' && value !== zip) {
      setZip(value);
    }
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  //TODO: Update data so that it gets the value the user has entered
  const updateProfile = (event) => {
      if (formValues.password !== formValues.confirm_password) {
        console.log('passwords dont match cuh')
      } else {
          fetch(`${process.env.REACT_APP_BASE_SERVER_URL}/update-profile`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ufname: `${firstName}`,
              ulname:  `${lastName}`,
              passwrd: `${password}`,
              uphnum: `${phoneNumber}`,
              ubio: `${bio}`,
              ustreet: `${street}`,
              ucity: `${city}`,
              ustate: `${state}`,
              uzip: `${zip}`
            })
          })
            .then(res => {
              if (res.status !== 200) {
                console.error("Error fetching profile details")
              }
              else {
                return res.json()
              }
            })
            .then(json => {
              console.log("PROFILE: ", json);
              setShowPopup(false)
            })
            .catch(error => console.log(error))

            setShowSnackbar(true)
  
            setTimeout(() => {
              setShowSnackbar(false)
            }, 3000)
          }
          event.preventDefault();
        }

  // Grab User's Info from Database
  useEffect (() => {
    fetch(`${process.env.REACT_APP_BASE_SERVER_URL}/get-profile`, {
      method: 'GET',
      credentials: 'include',
    })
    .then(res => {
      if (res.status !== 200) {
        console.error("Error fetching profile details")
      }
      else {
        return res.json()
      }
    })
    .then(json => {
      setFirstName(`${json.ufname}`)
      setLastName(`${json.ulname}`)
      setPhoneNumber(`${json.uphnum}`)
      if (json.ubio !== null && json.ubio !== "") {
        setBio(json.ubio)
      }
      setStreet(`${json.ustreet}`)
      setCity(`${json.ucity}`)
      setState(`${json.ustate}`)
      setZip(`${json.uzip}`)

      // Insert Profile Photo Here. State Variable Already defined above

    })
      .catch(error => console.log(error))
    }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage) => (currentImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  const handleBackHome = (event) => {
    setShowListings(false)
    event.preventDefault()
  }
  const dotIndicators = images.map((image, index) => (
    <span
      key={index}
      className={`dot ${index === currentImage ? "active" : ""}`}
      onClick={() => setCurrentImage(index)}
    />
  ));

  const toggleListings = () => {
    setShowListings(!showListings);
  }

  const listings = [
    {
      image: image1,
      address: 'Newark ,NJ',
      price: '$200',
    },
    {
      image: image2,
      address: 'Linden, NJ',
      price: '$300',
    },
    {
      image: image3,
      address: 'Elizabeth ,NJ',
      price: '$100',
    },
  ];
  const ListingsTab = ({ listings }) => (
    <div className="listings-tab">
      {listings.map((listing, index) => (
        <div key={index} className="listing">
          <img src={listing.image} alt={listing.address} />
          <div className="listing-info">
            <p className="price">{listing.price}</p>
            <p className="address">{listing.address}</p>
            <button className="request-button">Request</button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <Snackbar 
            open={showSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={3000}
        >
            <Alert severity='success'>Account Successfully Updated</Alert>
      </Snackbar>
      {showListings ? (
        <div>
          <h2 style={
            {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>My Listings <button style={
              {
                marginLeft: "200px",
                background: "green"
              }} onClick={handleBackHome}>Home</button></h2>
          <ListingsTab listings={listings} />
          <div>
            <h2>Current Rentals</h2>
            <div >
          <img src={image4} alt={''} />
          <div className="listing-info">
            <p className="price">{"$100"}</p>
            <p className="address">{"Newark ,NJ"}</p>
            <button className="end-rental-button">End rental</button>
          </div>
        </div>
          </div>
        </div>

      ) : (
        <div className="grid-container">

          <div className="personal">
            <div className="profile-picture">
              <img src={profilepic} alt="Profile" />
            </div>
            <div className="star-ratings">
              <Rating
                name="read-only"
                value={ rating }
                readOnly
              />
            </div> 
            <div className="profile-info">
              <h2>{firstName} {lastName}</h2>
              <p>{bio}</p>
              <button className="edit-profile-button" onClick={() => setShowPopup(true)}>Edit Profile</button>
            </div>
          </div>

          {showPopup ? (

            <form onSubmit={updateProfile}>
              <table>
                  <tbody>
                    <tr>
                      <td>
                        <RegisterTextField name="first_name" value={formValues.first_name} onChange={handleInputChange} id="first_name" label="First Name" variant="outlined"/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <RegisterTextField name="last_name" value={formValues.last_name} onChange={handleInputChange} id="last_name" label="Last Name" variant="outlined" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <RegisterTextField name="phone_number" value={formValues.phone_number} onChange={handleInputChange} id="phone_number" label="Phone Number" type='tel' variant="outlined" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <RegisterTextField name="bio" value={formValues.bio} onChange={handleInputChange} multiline={true} type="text" id="bio" label="Bio" variant="outlined" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                      <RegisterTextField name="street" value={formValues.street} onChange={handleInputChange} id="street" label="Street Address" variant="outlined"/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                      <RegisterTextField name="city" value={formValues.city} onChange={handleInputChange} id="city" label="City" variant="outlined" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                      <RegisterTextField name="state" value={formValues.state} onChange={handleInputChange} id="state" label="State" variant="outlined" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                      <RegisterTextField name="zip" value={formValues.zip} onChange={handleInputChange} id="zip" label="Zip Code" variant="outlined"  />
                      </td>
                    </tr>
                    <tr>
                      <td>
                      <RegisterTextField 
                        InputProps={{
                          endAdornment: (
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
                          )
                        }} 
                      id="password" 
                      name="password" 
                      onChange={handleInputChange} 
                      value={formValues.password} 
                      label="Password" 
                      type={showPassword ? 'text' : 'password'}
                      variant="outlined" 
                      error={formValues.password !== formValues.confirm_password ? true : false} 
                      helperText={formValues.password !== formValues.confirm_password ? `Passwords Do Not Match` : ""}/>
                      </td>
                    </tr> 
                    <tr>
                      <td>
                      <RegisterTextField
                        InputProps={{
                          endAdornment: (
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
                          )
                        }}  
                      id="confirm_password" 
                      name="confirm_password" 
                      onChange={handleInputChange} 
                      value={formValues.confirm_password} 
                      label="Confirm Password" 
                      type={showPassword ? 'text' : 'password'}
                      variant="outlined" 
                      error={formValues.password !== formValues.confirm_password ? true : false} 
                      helperText={formValues.password !== formValues.confirm_password ? `Passwords Do Not Match` : ""}/>
                      </td>
                    </tr>
                  </tbody>
              </table>
              <StyledButton type="submit" variant="contained">Save Changes</StyledButton>
            </form>

          ) : (
            <>
              <div className="slideshow">
                <img src={images[currentImage]} alt="Slideshow" />
                <div className="dot-indicators">{dotIndicators}</div>
                <button className="review-listing-button " onClick={toggleListings}>View Listings</button>
              </div>

              <div className="reviews">
                <h2>Tejkumar Patel</h2>
                <p> I was very impressed with the facility's cleanliness and security measures. </p>
                <h2>Jaimeen</h2>
                 <p> The unit itself was spacious and easily accessible, making it simple for me to move my belongings in and out.</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>

  );
}

export default Profile;
