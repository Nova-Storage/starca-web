import React, {useState} from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode, 
  getLatLng
} from "use-places-autocomplete"
import { CircularProgress } from '@mui/material';

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

  // Map Options. Disable various UI elements (PoI, map types, etc.)
  const mapOptions = {
    mapId: `${process.env.REACT_APP_MAP_ID}`,
    streetViewControl: false,
    mapTypeControl:false,
    fullscreenControl: false,
  }

  const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
    types: ["cities"],
  };
  
function Map({center}) {

  // Load the Google Map using the useJsApiLoader hook
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: `${process.env.REACT_APP_MAPS_API_KEY}`,
    libraries: ['places']
  })

  const [map, setMap] = useState(null)

  // If the map is still being loaded, display a progress bar
  if (!isLoaded) {
    return <CircularProgress />
  }

  // Map done loading, display page contents
  return (

    <div className='map'>

      {/* How to get auto complete for searching for input fields. Just wrap the input
      in the <Autocomplete> component */}
      {/* <Autocomplete>
        <input type='text'></input>
      </Autocomplete> */}

      <GoogleMap 
        center={center} 
        zoom={13} 
        mapContainerStyle={containerStyle}
        options={mapOptions}>

        {/* Display markers, etc. */}

      </GoogleMap>
    </div>
  )
}

const PlacesAutoComplete = ({ }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: {status, data},
    clearSuggestions
  } = usePlacesAutocomplete()
}

export default React.memo(Map);
