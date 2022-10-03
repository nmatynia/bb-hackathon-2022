import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { apiKey } from "../../apikey";
import markerIcon from '../../assets/icons/map-pin.svg'

// import windmillIcon from '../../assets/icons/windmill-circle.svg'
// import solarPanelIcon from '../../assets/icons/solar-panel-circle.svg'

import solarPanelRed from '../../assets/icons/solarPanel/solar-panel-circle-red.svg'
import solarPanelOrange from '../../assets/icons/solarPanel/solar-panel-circle-orange.svg'
import solarPanelYellow from '../../assets/icons/solarPanel/solar-panel-circle-yellow.svg'
import solarPanelGreen from '../../assets/icons/solarPanel/solar-panel-circle-green.svg'

import windmillRed from '../../assets/icons/windmill/windmill-circle-red.svg'
import windmillOrange from '../../assets/icons/windmill/windmill-circle-orange.svg'
import windmillYellow from '../../assets/icons/windmill/windmill-circle-yellow.svg'
import windmillGreen from '../../assets/icons/windmill/windmill-circle-green.svg'
import { IDataMock } from './dataMock';


const containerStyle = {
	width: '100vw',
	height: '100vh'
};
interface IProps {
	setPos: React.Dispatch<React.SetStateAction<{ lat: number, lng: number } | undefined>>,
	setMarkerInfo: React.Dispatch<React.SetStateAction<any>>,
	markerInfo: any
	handleResetAddMarkerInfo: () => void
	dataMock: IDataMock[]
	refreshMap: boolean;
}

const Map: React.FC<IProps> = ({
	setPos,
	setMarkerInfo,
	markerInfo,
	handleResetAddMarkerInfo,
	dataMock,
	refreshMap
}) => {

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

	const chooseMarkerIcon = (energyType: string, energyNeeded: number, energyMade: number) => {
		const goalPrecentage = Math.round(energyMade / energyNeeded * 100);

		if (goalPrecentage < 50) {

			return energyType === 'windmill' ? windmillRed : solarPanelRed
		}
		else if (goalPrecentage >= 50 && goalPrecentage < 75) {
			return energyType === 'windmill' ? windmillOrange : solarPanelOrange
		}
		else if (goalPrecentage >= 75 && goalPrecentage <= 99) {
			return energyType === 'windmill' ? windmillYellow : solarPanelYellow
		} else {
			return energyType === 'windmill' ? windmillGreen : solarPanelGreen
		}

	}

	const onLoad = React.useCallback((map: google.maps.Map) => {
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);
		setMap(map)

		//Mocked markers are being added to map here
		dataMock.forEach((marker) => {
			let googleMarker = new google.maps.Marker({
				position: marker.position,
				map: map,
				icon: chooseMarkerIcon(marker.energyType, marker.energyNeeded, marker.energyMade)
			});

			googleMarker.addListener('click', (e: google.maps.MapMouseEvent) => {
				setMarkerInfo(marker)
				handleResetAddMarkerInfo()
			})
		})
		//

	}, [])

	//User can add new marker 
	React.useEffect(() => {
		const newlyAddedData = dataMock[dataMock.length - 1]
		const googleMarker = map && new google.maps.Marker({
			position: newlyAddedData.position,
			map: map,
			icon: chooseMarkerIcon(newlyAddedData.energyType, newlyAddedData.energyNeeded, newlyAddedData.energyMade)
		});

		googleMarker && googleMarker.addListener('click', (e: google.maps.MapMouseEvent) => {
			setMarkerInfo(newlyAddedData)
			handleResetAddMarkerInfo()
		})

	}, [map, refreshMap])

	const onUnmount = React.useCallback(() => setMap(null), [])

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
		setMarkerInfo(null)
		placeMarker(e.latLng!, map);
	});

	return isLoaded ?
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
		/>
		: <></>
}

export default React.memo(Map)