import './Dashboard.css';
import React, {useState, useEffect} from 'react'
import Map from './Map.js'
import { Switch } from '@mui/material';
import Autocomplete from 'react-google-autocomplete';
import Geocode from 'react-geocode'

Geocode.setApiKey(`${process.env.REACT_APP_MAPS_API_KEY}`)
Geocode.setLocationType("ROOFTOP");

function Dashboard() {

  const [showMap, setShowMap] = useState(true)
  const [mapCenter, setCenter] = useState({
    lat: 40.7484,
    lng: -73.9857
  })

  function setCoords(place) {
    Geocode.fromAddress(place.formatted_address).then( (response) => {

      setCenter({
        lat: response.results[0].geometry.location.lat,
        lng: response.results[0].geometry.location.lng
      })
    },
    (error) => {
      console.log(error)
    })
  }

  const searchOptions = {
    componentRestriction: {
      country: 'us'
    },
    types: ['(regions)']
  }

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
        <Autocomplete   
          apiKey={`${process.env.REACT_APP_MAP_ID}`}
          options={searchOptions}
          onPlaceSelected={(place) => {
            setCenter(setCoords(place))
            console.log(mapCenter)
            }}> 
        </Autocomplete>
          <Map center={mapCenter}/>
      </div>
      )
    }
  }

export default React.memo(Dashboard);
