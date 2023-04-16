import React, {
  useState,
  useEffect
} from 'react'
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api';
import { CircularProgress } from '@mui/material';
import Autocomplete from 'react-google-autocomplete';
import Geocode from 'react-geocode'
import Border from './Border'

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

// Map component. Displays a Google Map 
function Map({listings}) {
  const [mapCenter, setCenter] = useState({
    lat: 40.7484,
    lng: -73.9857
  })

  const [zipCode, setZipCode] = useState('')
  const [state, setState] = useState('')
  const [paths, setPaths] = useState([]) // Array of arrays, each contains a LatLng object of cooridinates
  const [listingCoords, setListingCoords] = useState([])

  // Fetch the coordinates for the border for a given city/zip code
  function getPaths() {
    if (state !== '' && zipCode !== '') {
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
          // setPaths([])
          // setPaths(data)
          setTimeout(() => {
            setPaths(data)
          }, 0)
        })
        .catch((error) => console.error("Error:", error))
    }
  }

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
  
  // Need to get the zip code from the lat lng if they search for a city name
  function setZipAndStateFromLatLng(lat, lng) {
    Geocode.fromLatLng(lat, lng).then( 
      (response) => {
        for (var i = response.results[0].address_components.length-1; i >= 0; i--) {
          if (response.results[0].address_components[i].types.includes('postal_code')) {
            setZipCode(response.results[0].address_components[i].long_name)
            break;
          }
        }
        for (i = 0; i < response.results[0].address_components.length; i++) {
          if (response.results[0].address_components[i].types.includes('administrative_area_level_1')) {
            let s = response.results[0].address_components[i].long_name
            s = s.toLowerCase()
            s = s.replace(/ /g, "_")
            setState(s)
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

  function getListingCoords() {
    var arr = []

    for (let i = 0; i < listings.length; i++) {
      let s = `${listings[i].lcity}, ${listings[i].lstate} ${listings[i].lzip}, ${listings[i].lcountry}`
      Geocode.fromAddress(s).then( (response) => {
        arr.push({
          lat: response.results[0].geometry.location.lat,
          lng: response.results[0].geometry.location.lng,
          id: listings[i].lid
        })
        setListingCoords(arr)
      },
      (error) => {
        console.error(error)
      })
    }
  }

  // Hook that updates the map center to be current location. Happens only on initial render. Updates the state and zip code
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })

      setZipAndStateFromLatLng(position.coords.latitude, position.coords.longitude)
    })
  }, [])

  // Update the zip code and state for the new map center.
  useEffect(() => {
    if (mapCenter !== undefined) {
      setZipAndStateFromLatLng(mapCenter.lat, mapCenter.lng)
    }
  }, [mapCenter])

  useEffect(() => {
    getPaths()
  }, [zipCode, state])

  useEffect(() => {
    if (listings.length !== 0) {
      getListingCoords()
    }
  }, [listings])

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
    <div>
      <h2>You are currently in zip code {zipCode}</h2>
        <Autocomplete   
          apiKey={`${process.env.REACT_APP_MAP_ID}`}
          options={searchOptions}
          onPlaceSelected={(place) => {
            setCenter(() => getCoords(place))
            setStateFromSearch(place)
          }}
        > 
        </Autocomplete>
      <GoogleMap 
        center={mapCenter}
        zoom={14} 
        mapContainerStyle={containerStyle}
        options={mapOptions}
      >
        <div>
          {paths.length !== 0 &&
            <Border 
              paths={paths}
            >
            </Border>
          }


          {
          /* Insert listings from dashboard as markers onto the map: */
            listingCoords.map( marker => {
              return(
                <Marker 
                  position={{
                    lat: marker.lat,
                    lng: marker.lng
                  }}
                  key={marker.id}
                  visible={true}
                />
              )
            })
          }

        </div>
      </GoogleMap>
    </div>
  )
}

export default React.memo(Map);
