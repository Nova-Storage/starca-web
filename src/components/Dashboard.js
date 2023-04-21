import './Dashboard.css';
import React, {useState, useEffect} from 'react'
import Map from './Map.js'
import { Switch } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Geocode from 'react-geocode'
import Listings from './Listings.js';

Geocode.setApiKey(`${process.env.REACT_APP_MAPS_API_KEY}`)
Geocode.setLocationType("ROOFTOP");

function Dashboard() {

  // State Handler for the center and the Google Map
  const [showMap, setShowMap] = useState(true)
  const [listings, setListings] = useState([]);

  // Toggle whether the map is visible.
  const toggleMap = () => {
    setShowMap(!showMap)
  }

  useEffect(() => {
      fetch(`${process.env.REACT_APP_BASE_SERVER_URL}/get-listings`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
      })
      .then(res => res.json())
      .then(json => {
          console.log("FETCHED: " + json);
          setListings(json);
      })
      .catch(error => console.log(error));
  }, [])

  if (!showMap) {
    return (
    <div className='dashboard-container'>
      <div className='options'>
        <FormControlLabel control={<Switch id='toggle' checked={showMap} onChange={toggleMap} />} label="Map" />
      </div>
      <div className='grid-listings listings'>
        <Listings listings={ listings } listingColumnValue={2}/>
      </div>
    </div>
    )
  }
  else {
    return (
      <div className='dashboard-container'>
        <div className='options'>
          <FormControlLabel control={<Switch id='toggle' checked={showMap} onChange={toggleMap} />} label="Map" />
        </div>
        <div className="grid-map-listings-columns">
        {/* <Autocomplete   
          apiKey={`${process.env.REACT_APP_MAP_ID}`}
          options={searchOptions}
          onPlaceSelected={(place) => {setCenter(getCoords(place))}}> 
        </Autocomplete> */}
          {/* <Map center={mapCenter}/> */}
          <Map listings={ listings }/>
          <div className='listings'>
          <Listings listings={ listings } />
          </div>
        </div>
      </div>
      )
    }
  }

export default React.memo(Dashboard);
