import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { apiKey } from "../../apikey";

import markerIcon from '../../assets/icons/map-pin.svg'

import solarPanelRed from '../../assets/icons/solarPanel/solar-panel-circle-red.svg'
import solarPanelOrange from '../../assets/icons/solarPanel/solar-panel-circle-orange.svg'
import solarPanelYellow from '../../assets/icons/solarPanel/solar-panel-circle-yellow.svg'
import solarPanelGreen from '../../assets/icons/solarPanel/solar-panel-circle-green.svg'

import solarPanelRedSelected from '../../assets/icons/solarPanel/solar-panel-circle-red-hover.svg'
import solarPanelOrangeSelected from '../../assets/icons/solarPanel/solar-panel-circle-orange-hover.svg'
import solarPanelYellowSelected from '../../assets/icons/solarPanel/solar-panel-circle-yellow-hover.svg'
import solarPanelGreenSelected from '../../assets/icons/solarPanel/solar-panel-circle-green-hover.svg'

import windmillRed from '../../assets/icons/windmill/windmill-circle-red.svg'
import windmillOrange from '../../assets/icons/windmill/windmill-circle-orange.svg'
import windmillYellow from '../../assets/icons/windmill/windmill-circle-yellow.svg'
import windmillGreen from '../../assets/icons/windmill/windmill-circle-green.svg'

import windmillRedSelected from '../../assets/icons/windmill/windmill-circle-red-hover.svg'
import windmillOrangeSelected from '../../assets/icons/windmill/windmill-circle-orange-hover.svg'
import windmillYellowSelected from '../../assets/icons/windmill/windmill-circle-yellow-hover.svg'
import windmillGreenSelected from '../../assets/icons/windmill/windmill-circle-green-hover.svg'

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
	let markers: Array<{ info: IDataMock, marker: google.maps.Marker }> = [];

	const center = {
		lat: dataMock[0].position.lat,
		lng: dataMock[0].position.lng,
	};

	const chooseMarkerIcon = (energyType: string, energyNeeded: number, energyMade: number, selected?: boolean) => {
		const goalPrecentage = Math.round(energyMade / energyNeeded * 100);

		if (goalPrecentage < 50) {

			return energyType === 'windmill' ? (!selected ? windmillRed : windmillRedSelected) : (!selected ? solarPanelRed : solarPanelRedSelected)
		}
		else if (goalPrecentage >= 50 && goalPrecentage < 75) {
			return energyType === 'windmill' ? (!selected ? windmillOrange : windmillOrangeSelected) : (!selected ? solarPanelOrange : solarPanelOrangeSelected)
		}
		else if (goalPrecentage >= 75 && goalPrecentage <= 99) {
			return energyType === 'windmill' ? (!selected ? windmillYellow : windmillYellowSelected) : (!selected ? solarPanelYellow : solarPanelYellowSelected)
		} else {
			return energyType === 'windmill' ? (!selected ? windmillGreen : windmillGreenSelected) : (!selected ? solarPanelGreen : solarPanelGreenSelected)
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

			markers.push({ marker: googleMarker, info: marker })

			google.maps.event.addListener(googleMarker, 'click', ((googleMarker) => {
				return () => {
					setMarkerInfo(marker);
					handleResetAddMarkerInfo();

					//Changing icon's appearance based on selection
					markers.forEach(m => (m.marker.setIcon(chooseMarkerIcon(m.info.energyType, m.info.energyNeeded, m.info.energyMade, false))));
					googleMarker.setIcon(chooseMarkerIcon(marker.energyType, marker.energyNeeded, marker.energyMade, true));
					//
				}
			})(googleMarker));
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

			//Changing icon's appearance based on selection
			markers.forEach(m => (m.marker.setIcon(chooseMarkerIcon(m.info.energyType, m.info.energyNeeded, m.info.energyMade, false))));
			googleMarker.setIcon(chooseMarkerIcon(newlyAddedData.energyType, newlyAddedData.energyNeeded, newlyAddedData.energyMade, true));
			//
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