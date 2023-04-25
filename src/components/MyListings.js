import React from "react";
//import "./MyListings.css";
import image1 from './image1.jpeg';
import image2 from './image2.jpeg';
import image3 from './image3.jpeg';
import image4 from './image4.jpeg'
import { useEffect } from "react";
import { useLocation } from 'react-router-dom'
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

  return (
    <div>
    <div className="listings-tab">
      <Snackbar 
            open={showSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={3000}
        >
            <Alert severity='success'>{snackbarMessage}</Alert>
        </Snackbar>
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
  );
};

export default MyListings;
