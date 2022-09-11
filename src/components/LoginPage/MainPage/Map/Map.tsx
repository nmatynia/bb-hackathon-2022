import React from 'react'
import { DrawingManager, GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { FiMapPin } from 'react-icons/fi'
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
  })

  const [map, setMap] = React.useState<google.maps.Map | null>(null)
  let marker:google.maps.Marker;

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  const placeMarker = (position: google.maps.LatLng, map: google.maps.Map) => {
    if(marker){
      marker.setPosition(position)
      return;
    }

    marker = new google.maps.Marker({
      position: position,
      map: map
    });
    map.panTo(position);
  }

  map?.addListener('click', (e: google.maps.MapMouseEvent) => {
    placeMarker(e.latLng!, map);
  });

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControlOptions:{
            position: google.maps.ControlPosition.BOTTOM_CENTER 
          },
        }}
        
      >
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)