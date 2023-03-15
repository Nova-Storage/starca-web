import React, {useState} from 'react'
import { GoogleMap, useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { CircularProgress } from '@mui/material';

  // Styling for the map
  const containerStyle = {
    width: '40vw',
    height: '89vh',
    position: 'fixed',
    overflow: 'hidden',
    marginTop: '1%',
    borderRadius: '10px',
    // marginBottom: '3vmin',
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
        zoom={15} 
        mapContainerStyle={containerStyle}
        options={mapOptions}
        onLoad={(map) => setMap(map)}>

        {/* Display markers, etc. */}

      </GoogleMap>
    </div>
  )
}

export default React.memo(Map);
