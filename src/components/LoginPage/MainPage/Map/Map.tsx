import React from 'react'
import { DrawingManager, GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import { apiKey } from "../../../../apikey";

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

//TODO: Take position of fetched items[0].
const center = {
  lat: -3.745,
  lng: -38.523
};

const Map = () =>{ 
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: ['drawing'],
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{streetViewControl: false}}
        
      >
        { <DrawingManager/> }
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)