import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { CircularProgress } from '@mui/material';

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

  const US_BOUNDS = {
    north: 49.382808,
    south: 24.521208,
    west: -124.736342,
    east: -66.945392
  }

  // Map Options. Disable various UI elements (PoI, map types, etc.)
  const mapOptions = {
    mapId: `${process.env.REACT_APP_MAP_ID}`,
    streetViewControl: false,
    mapTypeControl:false,
    fullscreenControl: false,
    feature: {
      placeidId: "ChIJuXAqFCUAw4kRNDvR1irBWyc"
    }
  }

// Map component. Takes a center location as a prop. Displays a Google Map centered at 'center'
function Map({center}) {

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
      <GoogleMap 
        center={center}
        restrictions={{
          latlngBounds: US_BOUNDS,
          strictBounds: true
        }}
        zoom={13} 
        mapContainerStyle={containerStyle}
        options={mapOptions}>
      </GoogleMap>
    </div>
  )
}

export default React.memo(Map);
