import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { apiKey } from "../../apikey";
import markerIcon from '../../assets/map-pin.svg'
import { dataMock } from './dataMock';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};
interface IProps {
  setPos: React.Dispatch<React.SetStateAction<{
    lat: number;
    lng: number;
  } | undefined>>,
  setMarkerInfo: React.Dispatch<React.SetStateAction<any>>,
  markerInfo: any
}

const Map:React.FC<IProps> = ({setPos}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  })

  const [map, setMap] = React.useState<google.maps.Map | null>(null)

  let marker: google.maps.Marker;

  const center = {
    lat: dataMock[0].position.lat,
    lng: dataMock[0].position.lng,
  };

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
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
      zoom={5}
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