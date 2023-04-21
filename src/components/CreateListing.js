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

  const cancelNewListing = () => {
    navigate('/profile');
  }

  const imageListener = event => {

    // Warn the user too many files have been up
    if (event.target.files.length > 5) {
      console.log("Too many files");
      event.target.files = null
      setFileUploadText(tooManyFilesString);
      return;
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
  

  /*
  //Validate all form fields have been set
  // If field missing, change color of that field
  handleValidation() {

  }*/

  const createNewListing = event => {

    console.log(event.target.title.value);
    console.log(event.target.description.value);
    console.log(camerasCheckbox);
    console.log(images);

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
      .then(res => res.json())
      .then(json => {
        console.log(json)
        // If status 200, let them know listing created
        if (json === ""){
          
        }
        else {
          //TODO: Warn user form not submitted
        }
      })
      .catch(error => console.log(error))
      
      // Stop the form from refreshing the page which would create infinite refreshing
      event.preventDefault();
  }


  return (
    <div className='create-listing-container'>
        <h1 className='create-listing-title'>Create Listing</h1>
        <Paper elevation={3}>
          <form id="form" className='create-listing-form' onSubmit={createNewListing}>
              <StyledTextField id="title" label="Title" variant="outlined" sx={{ width: '100%'}} className='grid-col-span2 title'/>
              <StyledTextField id="description" label="Description" variant="outlined" multiline="true" rows="5" sx={{ width: '100%' }} className='grid-col-span2 grid-row-span2 description'/>
              <StyledTextField id="street" label="Street Address" variant="outlined" className='street' sx={{ width: '100%'}}/>
              <StyledTextField id="city" label="City" variant="outlined" className='city' sx={{ width: '100%'}}/>
              <StyledTextField id="state" label="State" variant="outlined" className='state' sx={{ width: '100%'}}/>
              <StyledTextField id="country" label="Country" variant="outlined" className='country' sx={{ width: '100%'}}/>
              <StyledTextField id="zipcode" label="Zip Code" variant="outlined" className='zipcode' sx={{ width: '100%'}}/>
              <div className='dimensions'>
                <StyledTextField id="length" label="Length" variant="outlined" type="number" sx={{ width: '100%', maxWidth: '30%'}} className='length'/>
                <StyledTextField id="width" label="Width" variant="outlined" type="number" sx={{ width: '100%', maxWidth: '30%'}} className='width'/>
                <StyledTextField id="height" label="Height" variant="outlined" type="number" sx={{ width: '100%', maxWidth: '30%'}} className='height'/>
              </div>
              <StyledTextField id="price" label="Price" variant="outlined" type="number" className='price' sx={{ width: '100%'}}/>
              <FormControlLabel id="cameras" value="top" control={<Checkbox />} label="Security Cameras"  labelPlacement="top" onChange={handleCamerasCheckboxClick}/>
              <FormControlLabel id="climate" value="top" control={<Checkbox />} label="Climate Control"  labelPlacement="top" onChange={handleClimateCheckboxClick}/>
              <FormControlLabel id="biometrics" value="top" control={<Checkbox />} label="Biometrics"  labelPlacement="top" onChange={handleBiometricsCheckboxClick}/>
              <FormControlLabel id="wheelchair" value="top" control={<Checkbox />} label="Wheelchair Accessible"  labelPlacement="top" onChange={handleWheelchairCheckboxClick}/>
              <div id="images">
                <StyledUploadButton variant="outlined" startIcon={<FileUploadOutlinedIcon />} onClick={handleUploadButtonClick}>
                  Upload your images
                </StyledUploadButton>
                <p style={{color: fileUploadText === tooManyFilesString ? 'red' : 'gray'}}>{fileUploadText}</p>
              </div>
              <input type="file" ref={hiddenFileInput} id="hidden-input" multiple onChange={imageListener} accept=".jpg,.png" style={{display: 'none'}}/>
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
