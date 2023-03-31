import React, {
  useState,
  useEffect
} from 'react'
import { GoogleMap, useJsApiLoader, Polygon } from '@react-google-maps/api';
import { CircularProgress } from '@mui/material';
import Autocomplete from 'react-google-autocomplete';
import Geocode from 'react-geocode'

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
}

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

  const [zipCode, setZipCode] = useState('')
  const [state, setState] = useState('')

  const [paths, setPaths] = useState([])

  // Need to parse the searched area to extract the state. Update the state variable.
function setStateFromSearch(place) {
  for (var i = place.address_components.length - 1; i >= 0; i--) {
    if (place.address_components[i].types.includes('administrative_area_level_1')) {
      let s = place.address_components[i].long_name
      s = s.toLowerCase()
      s = s.replace(/ /g, "_")
      setState(s)
      break;
    }
  }
}

function getPaths() {
  fetch('https://starcaserver.com/boundary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      zipCode: `${zipCode}`, state: `${state}`
    })
  })
    .then(res => res.json())
    .then(data => {
      // console.log(data)
      setPaths(data)
      console.log(paths)
    })
    .catch((error) => console.error("Error:", error))
}
  // Need to get the zip code from the lat lng if they search for a city name
function setZipFromLatLng(lat, lng) {
  Geocode.fromLatLng(lat, lng).then( 
    (response) => {

      for (var i = response.results[0].address_components.length-1; i >= 0; i--) {
        if (response.results[0].address_components[i].types.includes('postal_code')) {
          setZipCode(response.results[0].address_components[i].long_name)
          break;
        }
      }
  },
  (error) => {
    console.error(error)
  })
}

  // Function to get the latitude and longitude of a place and recenter the map to that location.
  function getCoords(place) {
    Geocode.fromAddress(place.formatted_address).then( (response) => {
      setCenter({
        lat: response.results[0].geometry.location.lat,
        lng: response.results[0].geometry.location.lng
      })
    },
    (error) => {
      console.error(error)
    })
  }

  // Update the zip code for the new map center.
  useEffect(() => {
    if (mapCenter !== undefined) {
      setZipFromLatLng(mapCenter.lat, mapCenter.lng)
    }
  }, [mapCenter])

  useEffect(() => {
    getPaths()
  }, [zipCode, state])
  
  // Hook that updates the map center to be current location. Happens only on initial render.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })

      setZipFromLatLng(position.coords.latitude, position.coords.longitude)
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
      <h2>You are currently in zip code {zipCode}</h2>
        <Autocomplete   
          apiKey={`${process.env.REACT_APP_MAP_ID}`}
          options={searchOptions}
          onPlaceSelected={(place) => {
            setCenter(() => getCoords(place))
            setStateFromSearch(place)
          }
            }> 
        </Autocomplete>
      <GoogleMap 
        center={mapCenter}
        zoom={13} 
        mapContainerStyle={containerStyle}
        options={mapOptions}
        version="beta"
        // onCenterChanged={() => setZipCode}
        >
          <Polygon
            paths={paths}
            editable={true}
            options={lineOptions}
            visible={true}
          />
      </GoogleMap>
    </div>
  )
}

export default React.memo(Map);
