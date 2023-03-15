import './Dashboard.css';
import React, {useState} from 'react'
import Map from './Map.js'
import { GoogleMap, useJsApiLoader, Autocomplete, LoadScript } from '@react-google-maps/api';
import { CircularProgress, Switch } from '@mui/material';
  
function Dashboard() {

  const [showMap, setShowMap] = useState(true)
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
      <h2>this.state.showMap</h2>
    </div>
    )
  }


    else {

      const center = {
        lat: 40.7484,
        lng: 73.9857
      }

      navigator.geolocation.getCurrentPosition((position) => {
        center.lat = position.coords.latitude
        center.lng = position.coords.longitude
    });

    console.log(center)
      return (
      <div>
        <Switch
        checked={showMap}
        onChange={toggleMap}
        />
        <CircularProgress>
          { center ? <Map center={center}/> : null }
        </CircularProgress>
      </div>
    )
  }
}

export default React.memo(Dashboard);
