import './ListingDetail.css';
import { useLocation, useNavigate} from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import StorageUnitOutline from '../images/StorageUnitOutline.jpg';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useState } from  'react';
import { StyledButton } from './StyledMuiComponents.js';
import ItemReview  from './ItemReview.js';
import { Storage } from '@mui/icons-material';
import { Snackbar, Alert } from '@mui/material'
import { loadStripe } from '@stripe/stripe-js';


function ListingDetail(props) {
    
    const { state } = useLocation();

    const { ownerID, listingID, listingTitle, listingDescription, listingPrice, listingAddress, listingCity, listingState, listingZip, listingAmenities} = state;

    var { listingImages } = state;
    if (listingImages == null) {
        listingImages = [StorageUnitOutline, StorageUnitOutline, StorageUnitOutline, StorageUnitOutline];
    }

    const [image, setImage] = useState(listingImages[0]);
    
    const [showSnackbar, setShowSnackbar] = useState(false)

    const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

    const handleImageClick = event => {
      console.log("Event: " + event);
      setImage(event);
    }

    const navigate = useNavigate()

    const handlePayment = () => {
      fetch(`${process.env.REACT_APP_BASE_SERVER_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lid: listingID,
          ownerID: ownerID,
          renterID: sessionStorage.getItem('userID')
        })
      })
        .then(res => res.json())
        .then(json => {
          console.log(json)
          if (json['message'] === 'Checkout Link Created') {
            window.open(json['checkout_link'], '_self')
          }
        })
        .catch(error => {
          console.log("Error Creating Checkout Link")
        })
    } 

    async function handleRequestClick() {

      fetch(`https://api-${process.env.REACT_APP_SENDBIRD_ID}.sendbird.com/v3/group_channels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': `${process.env.REACT_APP_SENDBIRD_API_TOKEN}`
      },
      body: JSON.stringify({
        "user_ids": [`${sessionStorage.getItem("email")}`, `${ownerID}`],
        "is_distinct": true,
      })
    })
      .then(res => res.json())
      .then(data => {
        fetch(`https://api-${process.env.REACT_APP_SENDBIRD_ID}.sendbird.com/v3/group_channels/${data.channel_url}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Api-Token': `${process.env.REACT_APP_SENDBIRD_API_TOKEN}`
          },
          body: JSON.stringify({
            "message_type": "MESG",
            "user_id": sessionStorage.getItem("email"),
            "message": `Hello, I am interested in your storage listing at ${listingAddress}, ${listingCity}, ${listingState} ${listingZip}`,
            "mention_type": "users",
            "mentioned_user_ids": [`${ownerID}`] 
          })
        })
          .then(res => res.json())
          .then(data => {
            setShowSnackbar(true)
  
            setTimeout(() => {
              setShowSnackbar(false)
              navigate('/messages')
            }, 2000)
          })
          .catch(error => {
            console.log("Error Sending Message")
          })
      })
      .catch(error => {
        console.log("Error Creating Channel")
      })
    }
    
    return (
      <div>
        <div className="grid-even-columns">
          <Snackbar 
              open={showSnackbar}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              autoHideDuration={3000}
          >
              <Alert severity='success'>Request Message Sent!</Alert>
          </Snackbar>
            <ImageList sx={{ width: 150, height: 300, margin: 0}} cols={1} rowHeight={105}>
              {listingImages.map((item) => (
                <ImageListItem key={item} onClick={() => handleImageClick(item)} className='image-list-item'>
                  <img
                    src={`${item}`}
                    srcSet={`${item}`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
            <div className="grid-inner-rows">
              <h2> {listingTitle} </h2>
              <p> { listingCity }, { listingState }</p>
              <CardMedia
                component="img"
                height="300"
                image={ image }
                alt="storage unit outline"
              />
            </div>
            <div className="grid-listing-description">
              <h2> { listingPrice } </h2>
              <StyledButton type="submit" variant="contained" onClick={() => handlePayment()}>Pay For Listing</StyledButton>
              <StyledButton type="submit" variant="contained" onClick={() => handleRequestClick()}>Request Listing</StyledButton>
              <p> { listingDescription } </p>
            </div>
        </div>
        <div>
              <h2>
                Amenities: <br />
                <p font-weight="normal">{ listingAmenities }</p>
              </h2>
            </div>
        <ItemReview />
      </div>
    );
}

// Random images for testing
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];

export default ListingDetail;
