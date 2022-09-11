import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { apiKey } from "../../../../apikey";
import markerIcon from '../../../../icons/map-pin.svg'


const containerStyle = {
  width: '100vw',
  height: '100vh'
};

//TODO: Take position of fetched items[0].
const center = {
  lat: -3.745,
  lng: -38.523
};

interface IProps {
  setPos: React.Dispatch<React.SetStateAction<{
    lat: number;
    lng: number;
  } | undefined>>
}

const Map:React.FC<IProps> = ({setPos}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  })

  const [map, setMap] = React.useState<google.maps.Map | null>(null)

  let marker: google.maps.Marker;

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  const placeMarker = (position: google.maps.LatLng, map: google.maps.Map) => {
    if (marker) {
      marker.setPosition(position)
      return;
    }

    marker = new google.maps.Marker({
      position: position,
      map: map,
      icon: markerIcon
    });
    map.panTo(position);
  }
  
  map?.addListener('click', (e: google.maps.MapMouseEvent) => {
    const positionObj = {
      lat: e.latLng!.lat() as number,
      lng: e.latLng!.lng() as number,
    }
    setPos(positionObj)
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
        mapTypeControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_CENTER
        },
        styles: [
          {
            featureType: "poi",
            stylers: [
              { visibility: "off" }
            ]
          }
        ]
      }}
    >
    </GoogleMap>
  ) : <></>
}

export default React.memo(Map)