import './Dashboard.css';
import React, {useState, useEffect} from 'react'
import Map from './Map.js'
import { Switch } from '@mui/material';
import Geocode from 'react-geocode'

Geocode.setApiKey(`${process.env.REACT_APP_MAPS_API_KEY}`)
Geocode.setLocationType("ROOFTOP");

function Dashboard() {

  // State Handler for the center and the Google Map
  const [showMap, setShowMap] = useState(true)

  // Toggle whether the map is visible.
  const toggleMap = () => {
    setShowMap(!showMap)
  }

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
        {/* <Autocomplete   
          apiKey={`${process.env.REACT_APP_MAP_ID}`}
          options={searchOptions}
          onPlaceSelected={(place) => {setCenter(getCoords(place))}}> 
        </Autocomplete> */}
          {/* <Map center={mapCenter}/> */}
          <Map />
      </div>
      )
    }
  }

export default React.memo(Dashboard);
