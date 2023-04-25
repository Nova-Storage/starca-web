import { React, useState, useRef } from 'react';
import './CreateListing.css';
import { StyledButton, StyledNegativeButton, StyledTextField, StyledUploadButton } from './StyledMuiComponents.js';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useNavigate } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import { upload } from '@testing-library/user-event/dist/upload';
import logo  from '../images/starca-logo-icon.png';
import Cookies from 'js-cookie';
import { FormHelperText } from '@mui/material';

function CreateListing() {

  const navigate = useNavigate();
  const [images, setImages] = useState();
  const [fileUploadText, setFileUploadText] = useState("");
  const [camerasCheckbox, setCamerasCheckbox] = useState(false);
  const [climateCheckbox, setClimateCheckbox] = useState(false);
  const [biometricsCheckbox, setBiometricsCheckbox] = useState(false);
  const [wheelchairCheckbox, setWheelchairCheckbox] = useState(false);
  const tooManyFilesString = 'Upload up to 5 images only';
  // Reference to the invisible input button 
  const hiddenFileInput = useRef(null);

  const [blockSubmit, setBlockSubmit] = useState(false)
  const [titleError, setTitleError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const [streetError, setStreetError] = useState(false)
  const [cityError, setCityError] = useState(false)
  const [stateError, setStateError] = useState(false)
  const [countryError, setCountryError] = useState(false)
  const [zipError, setZipError] = useState(false)
  const [priceError, setPriceError] = useState(false)
  const [lengthError, setLengthError] = useState(false)
  const [widthError, setWidthError] = useState(false)
  const [heightError, setHeightError] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleFieldUpdate = (field) => {
    switch (field) {
      case "title":
        setTitleError(false)
        break;
      case "description":
        setStreetError(false)
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
      case "country":
        setCountryError(false)
        break;
      case "zip":
        setZipError(false)
        break;
      case "price":
        setPriceError(false)
        break;
      case "length":
        setLengthError(false)
        break;
      case "width":
        setWidthError(false)
        break;
      case "height":
        setHeightError(false)
        break;
      case "image":
        setImageError(false)
        break;
      default:
        break;
    }
  }

  const cancelNewListing = () => {
    navigate('/profile');
  }

  const imageListener = event => {

    if (event.target.files.length < 1) {
      console.log("not enough images")
      event.target.files = null
      setImageError(true)
      return;
    }

    // Warn the user too many files have been up
    else if (event.target.files.length > 5) {
      console.log("Too many files");
      event.target.files = null
      setFileUploadText(tooManyFilesString);
      return;
    }

    if (event.target.files.length > 0) {
      handleFieldUpdate('image')
    }

    const uploadString = (event.target.files.length > 0) ? `Uploaded ${event.target.files.length} files` : 'No files uploaded'
    setFileUploadText(uploadString);

    const imagesSelected = event.target.files;
    setImages(imagesSelected);
  }

  // Targets the invisible input button when we click our custom upload button
  const handleUploadButtonClick = event => {
    hiddenFileInput.current.click();
  }

  //Listen to checkbox changes
  const handleCamerasCheckboxClick = event => {
    setCamerasCheckbox(event.target.checked);
  }

  const handleClimateCheckboxClick = event => {
    setClimateCheckbox(event.target.checked);
  }

  const handleBiometricsCheckboxClick = event => {
    setBiometricsCheckbox(event.target.checked);
  }

  const handleWheelchairCheckboxClick = event => {
    setWheelchairCheckbox(event.target.checked);
  }
  
  //Validate all form fields have been set
  // If field missing, change color of that field
  // const handleValidation = (event) => {
  // }

  const createNewListing = event => {

    // event.preventDefault()
    // event.stopPropagation();

    console.log(event.target.title.value);
    console.log(event.target.description.value);
    console.log(camerasCheckbox);
    console.log(images);

    console.log(event)

    if (event.target.title.value === "") {
      setTitleError(true);
      setBlockSubmit(true)
    }
    if (event.target.street.value === "") {
      setAddressError(true);
      setBlockSubmit(true)
    }
    if (event.target.description.value === "") {
      setStreetError(true);
      setBlockSubmit(true)
    }
    if (event.target.city.value === "") {
      setCityError(true);
      setBlockSubmit(true)
    }
    if (event.target.state.value === "") {
      setStateError(true);
      setBlockSubmit(true)
    }
    if (event.target.country.value === "") {
      setCountryError(true);
      setBlockSubmit(true)
    }
    if (event.target.zipcode.value === "") {
      setZipError(true);
      setBlockSubmit(true)
    }
    if (event.target.price.value === "") {
      setPriceError(true);
      setBlockSubmit(true)
    }
    if (event.target.length.value === "") {
      setLengthError(true);
      setBlockSubmit(true)
    }
    if (event.target.width.value === "") {
      setWidthError(true);
      setBlockSubmit(true)
    }
    if (event.target.height.value === "") {
      setHeightError(true);
      setBlockSubmit(true)
    }

    if (!images) {
      setImageError(true);
      setBlockSubmit(true)
    }

    else {
      const listingsData = new FormData();
      listingsData.append('ltitle', event.target.title.value);
      listingsData.append('ldescr', event.target.description.value);
      listingsData.append('llen', event.target.length.valueAsNumber);
      listingsData.append('lwid', event.target.width.valueAsNumber);
      listingsData.append('lheight', event.target.height.valueAsNumber);
      listingsData.append('lprice', event.target.price.valueAsNumber);
      listingsData.append('lstreet', event.target.street.value);
      listingsData.append('lcity', event.target.city.value);
      listingsData.append('lstate', event.target.state.value);
      listingsData.append('lzip', event.target.zipcode.value);
      listingsData.append('lcountry', event.target.country.value);
      listingsData.append('lseccamara', camerasCheckbox);
      listingsData.append('lclicontroll', climateCheckbox);
      listingsData.append('lbiometric', biometricsCheckbox);
      listingsData.append('lwhaccess', wheelchairCheckbox);
      listingsData.append('userId', sessionStorage.getItem("userID"))

      for (const image of images) {
        listingsData.append('files', image);
      }
      
      fetch(`${process.env.REACT_APP_BASE_SERVER_URL}/listing`, {
        method: 'POST',
        credentials: 'include',
        body: listingsData
      })
        .then(res => {
          if (!res.status === 200) {
            console.error('Error creating listing')
          } else {
            return res.json()
          }
        })
        .then(json => {
          // If status 200, let them know listing created
          navigate('/my-listings', { state: { 
            showSnackbar: true,
            message: `Listing Created!`
        }})
        })
        .catch(error => console.log(error))
  }
      
      // Stop the form from refreshing the page which would create infinite refreshing
    event.preventDefault();
  }

  return (
    <div className='create-listing-container'>
        <h1 className='create-listing-title'>Create Listing</h1>
        <Paper elevation={3}>
          <form id="form" className='create-listing-form' onSubmit={createNewListing}>
              <StyledTextField id="title" error={titleError ? true : false} helperText={titleError ? "Required" : ""} onChange={(e) => handleFieldUpdate("title", e)} label="Title" variant="outlined" sx={{ width: '100%'}} className='grid-col-span2 title'/>
              <StyledTextField id="description" error={streetError ? true : false} helperText={streetError ? "Required" : ""} onChange={(e) => handleFieldUpdate("description", e)} label="Description" variant="outlined" multiline={true} rows="5" sx={{ width: '100%' }} className='grid-col-span2 grid-row-span2 description'/>
              <StyledTextField id="street" error={addressError ? true : false} helperText={addressError ? "Required" : ""} onChange={(e) => handleFieldUpdate("address", e)} label="Street Address" variant="outlined" className='street' sx={{ width: '100%'}}/>
              <StyledTextField id="city" error={cityError ? true : false} helperText={cityError ? "Required" : ""} onChange={(e) => handleFieldUpdate("city", e)} label="City" variant="outlined" className='city' sx={{ width: '100%'}}/>
              <StyledTextField id="state" error={stateError ? true : false} helperText={stateError ? "Required" : ""} onChange={(e) => handleFieldUpdate("state", e)} label="State" variant="outlined" className='state' sx={{ width: '100%'}}/>
              <StyledTextField id="country" error={countryError ? true : false} helperText={countryError ? "Required" : ""} onChange={(e) => handleFieldUpdate("country", e)} label="Country" variant="outlined" className='country' sx={{ width: '100%'}}/>
              <StyledTextField id="zipcode" error={zipError ? true : false} helperText={zipError ? "Required" : ""} onChange={(e) => handleFieldUpdate("zip", e)} label="Zip Code" variant="outlined" className='zipcode' sx={{ width: '100%'}}/>
              <div className='dimensions'>
                <StyledTextField id="length" error={lengthError ? true : false} helperText={lengthError ? "Required" : ""} onChange={(e) => handleFieldUpdate("length", e)} label="Length" variant="outlined" type="number" sx={{ width: '100%', maxWidth: '30%'}} className='length'/>
                <StyledTextField id="width" error={widthError ? true : false} helperText={widthError ? "Required" : ""} onChange={(e) => handleFieldUpdate("width", e)} label="Width" variant="outlined" type="number" sx={{ width: '100%', maxWidth: '30%'}} className='width'/>
                <StyledTextField id="height" error={heightError ? true : false} helperText={heightError ? "Required" : ""} onChange={(e) => handleFieldUpdate("height", e)} label="Height" variant="outlined" type="number" sx={{ width: '100%', maxWidth: '30%'}} className='height'/>
              </div>
              <StyledTextField id="price" error={priceError ? true : false} helperText={priceError ? "Required" : ""} onChange={(e) => handleFieldUpdate("price", e)} label="Price" variant="outlined" type="number" className='price' sx={{ width: '100%'}}/>
              <FormControlLabel id="cameras" value="top" control={<Checkbox />} label="Security Cameras"  labelPlacement="top" onChange={handleCamerasCheckboxClick}/>
              <FormControlLabel id="climate" value="top" control={<Checkbox />} label="Climate Control"  labelPlacement="top" onChange={handleClimateCheckboxClick}/>
              <FormControlLabel id="biometrics" value="top" control={<Checkbox />} label="Biometrics"  labelPlacement="top" onChange={handleBiometricsCheckboxClick}/>
              <FormControlLabel id="wheelchair" value="top" control={<Checkbox />} label="Wheelchair Accessible"  labelPlacement="top" onChange={handleWheelchairCheckboxClick}/>
              <div id="images">
                <StyledUploadButton  variant="contained"  sx={{ color: imageError ? 'white' : 'black' }} color={imageError ? 'error' : 'grey'} startIcon={<FileUploadOutlinedIcon />} onClick={handleUploadButtonClick}>
                  Upload your images
                </StyledUploadButton>
                { imageError ?
                  <FormHelperText style={{color: 'red'}}>
                      Must upload at least 1 image.
                  </FormHelperText>
                  : <></>
                }
                <p style={{color: fileUploadText === tooManyFilesString ? 'red' : 'gray'}}>{fileUploadText}</p>
              </div>
              <input type="file" ref={hiddenFileInput} id="hidden-input" multiple onChange={imageListener} 
                accept=".jpg,.png" style={{display: 'none'}}/>
              <StyledNegativeButton type="button" variant="contained" id="cancel" onClick={cancelNewListing}>Cancel</StyledNegativeButton>
              <StyledButton type="submit" id="submit" variant="contained">Submit</StyledButton>
          </form>
        </Paper>
        <div className='create-listing-buttons'>
            
            
        </div>
    </div>
  )
}

export default CreateListing
