import './Dashboard.css';
import React, {useState} from 'react'
import Map from './Map.js'
import { GoogleMap, useJsApiLoader, Autocomplete, LoadScript } from '@react-google-maps/api';
import { Switch } from '@mui/material';
  
function Dashboard() {

  const center = {
    lat: 40.7484,
    lng: -73.9857
  }

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
          <Map center={center}/>
      </div>
      )
    }
  }

export default React.memo(Dashboard);
