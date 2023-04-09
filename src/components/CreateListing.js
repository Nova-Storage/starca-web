import { React,  useState } from 'react';
import './CreateListing.css';
import { StyledButton, StyledNegativeButton, LoginTextField, StyledTextField } from './StyledMuiComponents.js';
import { useNavigate } from 'react-router-dom';

function CreateListing() {

  const navigate = useNavigate();

  const cancelNewListing = () => {
    navigate('/profile');
  }

  const [images, setImages] = useState([]);

  const imageListener = event => {

    if (event.target.files.length > 5) {
      alert("Please upload 1 to 5 images");
      console.log("Too many files");
      event.target.files = null
      return;
    }

    const imagesSelected = Array.from(event.target.files);
    setImages(imagesSelected);
  }
  

  const createNewListing = event => {

    console.log(event.target.title.value);
    console.log(event.target.description.value);
    console.log(images);

    /*
    const selectedImages = Array.prototype.slice.call(event.target.images);
    const uploaded = [...uploadedFiles]; 
    files.some((file) => {
      uploaded.push(file);
    })*/

    /*
    setImages({ ...event.target.images });
    console.log(images);
    */

    /*
    //TODO: Change the endpoint
    fetch('https://starcaserver.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        //TODO: Finish these fields, make sure it matchees with field names in backend
        email: event.target.title.value,
        description: event.target.description.value
      })
    })
      .then(res => res.text()) //Change from text to json
      .then(json => {
        console.log(json)
        // If status 200, let them know listing created
        if (json === "You Logged in.!"){
          props.authenticated();
          navigate('/');
        }
        else {
          //TODO: Make input fields red
        }
      })
      .catch(error => console.log(error))
      */
      
      // Stop the form from refreshing the page which would create infinite refreshing
      event.preventDefault();
  }


  return (
    <div className='create-listing-container'>
        <h1 className='create-listing-title'>Create Listing</h1>
        <form id="form" className='create-listing-form' onSubmit={createNewListing}>
            <StyledTextField id="temp" label="Title" variant="outlined" sx={{ width: '100%', maxWidth: '80%'}} className='grid-col-span3'/>
            <StyledTextField id="city" label="City" variant="outlined"/>
            <StyledTextField id="description" label="Description" variant="outlined" multiline="true" rows="4" sx={{ width: '100%', maxWidth: '80%' }} className='grid-col-span3 grid-row-span2'/>
            <StyledTextField id="street" label="Street Address" variant="outlined"/>
            <StyledTextField id="state" label="State" variant="outlined"/>
            <StyledTextField id="length" label="Length" variant="outlined" sx={{ width: '100%', maxWidth: '30%'}}/>
            <StyledTextField id="width" label="Width" variant="outlined" sx={{ width: '100%', maxWidth: '30%'}}/>
            <StyledTextField id="height" label="Height" variant="outlined" sx={{ width: '100%', maxWidth: '30%'}} />
            
            <StyledTextField id="zipcode" label="Zip Code" variant="outlined"/>
            <StyledTextField id="price" label="Price" variant="outlined" className='price'/>
            <input type="file" id="images" multiple onChange={imageListener} accept=".jpg,.png"/>
            <StyledNegativeButton type="button" variant="contained" id="cancel" onClick={cancelNewListing}>Cancel</StyledNegativeButton>
            <StyledButton type="submit" id="submit" variant="contained">Submit</StyledButton>
        </form>
        <div className='create-listing-buttons'>
            
            
        </div>
    </div>
  )
}

export default CreateListing