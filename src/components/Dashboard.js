import './Dashboard.css';
import React, {useState, useEffect} from 'react'
import Map from './Map.js'
import { Switch } from '@mui/material';
import Autocomplete from 'react-google-autocomplete';
import Geocode from 'react-geocode'

Geocode.setApiKey(`${process.env.REACT_APP_MAPS_API_KEY}`)
Geocode.setLocationType("ROOFTOP");

function Dashboard() {

  // State Handler for the center and the Google Map
  const [showMap, setShowMap] = useState(true)
  const [mapCenter, setCenter] = useState({
    lat: 40.7484,
    lng: -73.9857
  })

  // Function to get the Lat and Lng from an address.
  function getCoords(place) {
    console.log(place.place_id)
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

  // Search Box Autocomplete options
  const searchOptions = {
    types: ["(regions)"],
    componentRestrictions: { country: "us" },
  }

  // Hook that updates the map when center is updated.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {

      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
    }, [])

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
        <Autocomplete   
          apiKey={`${process.env.REACT_APP_MAP_ID}`}
          options={searchOptions}
          onPlaceSelected={(place) => {setCenter(getCoords(place))}}> 
        </Autocomplete>
          <Map center={mapCenter}/>
      </div>
      )
    }
  }

export default React.memo(Dashboard);
