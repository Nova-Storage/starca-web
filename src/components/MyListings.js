import React, { useEffect } from "react";
import "./MyListings.css";
import ItemListing from './ItemListing.js';
import { StyledButton } from './StyledMuiComponents';
import {useNavigate, useLocation} from 'react-router-dom';
import { Snackbar, Alert  } from '@mui/material'


const MyListings = (props) => {


  const [showSnackbar, setShowSnackbar] = React.useState(false)
  const [snackbarMessage, setSnackbarMessage] = React.useState('')

  const location = useLocation()
  useEffect(() => {
      if (location.state) {
        setShowSnackbar(location.state.showSnackbar)
        setSnackbarMessage(location.state.message)
      }
    
      setTimeout(() => {
        setShowSnackbar(false)
      }, 3000)
    }, [])

  
  const [myListings, setMyListings] = React.useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_SERVER_URL}/get-my-listings`, {
      method: 'GET',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
      })
      .then(res => res.json())
      .then(json => {
          console.log("MY LISTINGS: " + json[0].ltitle);
          setMyListings(json);
      })
      .catch(error => console.log(error));
    }, [])

    const navigate = useNavigate();
    const handleNewListingClick = () => {
        navigate('/create-listing');
    }

    /*
    onClick={ () => { 
                      navigate('/detail', { state: {
                          ownerID: listing.luserid,
                          listingID: listing.lid,
                          listingImages:  listing.imageUrls,
                          listingTitle: listing.ltitle,
                          listingDescription: listing.ldescr,
                          listingPrice: listing.lprice,
                          listingAddress: listing.lstreet,
                          listingCity: listing.lcity,
                          listingState: listing.lstate,
                          listingZip: listing.lzip,
                          listingAmenities: ['Security Cameras, ', 'Biometrics, ', 'Wheelchair Accessible'],
                      } }
    */

    //TODO: Create "MyListing item component"

    return (
      <div className="my-listings-container">
        <Snackbar 
            open={showSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={3000}>
            <Alert severity='success'>{snackbarMessage}</Alert>
        </Snackbar>
        <StyledButton type="submit" 
                      variant="contained" 
                      className="create-listing-button" 
                      style={{width: '10rem'}}
                      onClick={handleNewListingClick}>New Listing</StyledButton>
        <h1 className="my-listings-title" id="title">My Listings</h1>
        <div className="my-listings-grid-container">
            {myListings.map(listing => {
            return(
                <ItemListing 
                    listingImages = { listing.imageUrls ? listing.imageUrls : false }
                    listingTitle={ listing.ltitle }
                    listingDescription={ listing.ldescr }
                    listingPrice={ listing.lprice }
                    listingAddress={ listing.lstreet }
                    listingCity={ listing.lcity }
                    listingState={ listing.lstate } 
                    listingZip={ listing.lzip }
                    listingAmenities= { ['Security Cameras, ', 'Biometrics, ', 'Wheelchair Accessible'] }/>
            );
            })}
        </div>
        <h1 className="my-listings-title" id="rentals-title">My Rentals</h1>
      </div>
      );
};

export default MyListings;
