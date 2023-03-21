import React, {
  useState,
  useEffect
} from 'react'
import { GoogleMap, useJsApiLoader, Polygon } from '@react-google-maps/api';
import { CircularProgress } from '@mui/material';
import Autocomplete from 'react-google-autocomplete';
import Geocode from 'react-geocode'
import { initializeApp } from 'firebase/app'


// Geocode library initialization
Geocode.setApiKey(`${process.env.REACT_APP_MAPS_API_KEY}`)
Geocode.setLocationType("ROOFTOP");

// Google Map API Libraries to be included. Defined here for performance reasons
const lib = ['places']

// Styling for the map
const containerStyle = {
  width: '40vw',
  height: '89vh',
  position: 'fixed',
  overflow: 'hidden',
  marginTop: '1%',
  borderRadius: '10px',
  marginLeft: '2vmin',
  border: '1px solid black'
};

// Search Box Autocomplete options
const searchOptions = {
  types: ["locality", "postal_code"],
  componentRestrictions: { country: "us" },
}

// Map Options. Disable various UI elements (PoI, map types, etc.)
const mapOptions = {
  mapId: `${process.env.REACT_APP_MAP_ID}`,
  streetViewControl: false,
  mapTypeControl:false,
  fullscreenControl: false,
  feature: {
    placeId: "ChIJuXAqFCUAw4kRNDvR1irBWyc"
  }
}

let test = require(`./stateZIPs/new_jersey.json`)
const test2 = test.features.find(element => element.properties.ZCTA5CE10 === '07102')

const paths = []

for (var i = 0; i < test2.geometry.coordinates[0].length; i++) {
  paths.push({
    lat: test2.geometry.coordinates[0][i][1],
    lng: test2.geometry.coordinates[0][i][0]
  })
}

console.log(paths)

const lineOptions = {
  fillColor: "lightblue",
  fillOpacity: 0.4,
  strokeColor: "white",
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1
}

// Map component. Takes a center location as a prop. Displays a Google Map centered at 'center'
// function Map({center}) {
function Map() {

  const [mapCenter, setCenter] = useState({
    lat: 40.7484,
    lng: -73.9857
  })

  // Function to get the latitude and longitude of a place and recenter the map to that location.
  function getCoords(place) {
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
  
  // Hook that updates the map when center is updated.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
  
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
    }, [])

  // Load the Google Map using the useJsApiLoader hook
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_MAPS_API_KEY}`,
    libraries: lib
  })

  // If the map is still being loaded, display a progress bar
  if (!isLoaded) {
    return <CircularProgress />
  }

  // Map done loading, display page contents
  return (

    <div className='map'>
        <Autocomplete   
          apiKey={`${process.env.REACT_APP_MAP_ID}`}
          options={searchOptions}
          onPlaceSelected={(place) => {
            setCenter(getCoords(place))}
            }> 
        </Autocomplete>
      <GoogleMap 
        center={mapCenter}
        zoom={13} 
        mapContainerStyle={containerStyle}
        options={mapOptions}
        version="beta"
        // onCenterChanged={() => console.log("TEST")}
        >
                    <Polygon
            paths={paths}
            options={lineOptions}
            visible={true}
          />
      </GoogleMap>
    </div>
  )
}

export default React.memo(Map);
