import './Dashboard.css';
import React, {useState, useEffect} from 'react'
import Map from './Map.js'
import { Switch } from '@mui/material';
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
      fetch('https://starcaserver.com/get-listings', {
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
    <div>
      <Switch
        checked={showMap}
        onChange={toggleMap}
      />
    </div>
    )
  }
  else {
    return (
      <div>
        <Switch
          checked={showMap}
          onChange={toggleMap}
        />
        <div className="grid-map-listings-columns">
        {/* <Autocomplete   
          apiKey={`${process.env.REACT_APP_MAP_ID}`}
          options={searchOptions}
          onPlaceSelected={(place) => {setCenter(getCoords(place))}}> 
        </Autocomplete> */}
          {/* <Map center={mapCenter}/> */}
          <Map listings={ listings }/>
          <Listings listings={ listings }/>
        </div>
      </div>
      )
    }
  }

export default React.memo(Dashboard);
