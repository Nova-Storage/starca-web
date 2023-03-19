import './Dashboard.css';
import React, {useState, useEffect} from 'react'
import Map from './Map.js'
import { Switch } from '@mui/material';
  
function Dashboard() {

  const [showMap, setShowMap] = useState(true)
  const [mapCenter, setCenter] = useState({
    lat: 40.7484,
    lng: -73.9857
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {

      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
    }, [])

  const toggleMap = () => {
    setShowMap(!showMap)
  }
  console.log(mapCenter)

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
          <Map center={mapCenter}/>
      </div>
      )
    }
  }

export default React.memo(Dashboard);
