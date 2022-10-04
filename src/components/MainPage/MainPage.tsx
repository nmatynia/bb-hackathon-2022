import React from 'react'
import Map from './Map'
import TopInterface from './TopInterface'
import LeftInterface from './LeftInterface'
import AdminPageModal from './AdminPageModal'
import { useDisclosure } from '@chakra-ui/react'
import { ICompaniesMock, IDataMock, dataMock } from './dataMock'

export const MainPage = () => {
	const [areaType, setAreaType] = React.useState<string>('')
	const [quantity, setQuantity] = React.useState<number>(0)
	const [yieldValue, setYieldValue] = React.useState(0)
	const [company, setCompany] = React.useState<ICompaniesMock | null>(null)
	const [pos, setPos] = React.useState<{ lat: number, lng: number }>()
	const [markerInfo, setMarkerInfo] = React.useState<IDataMock | null>(null);
	const [refreshMap, setRefreshMap] = React.useState(false)

	const { isOpen, onOpen, onClose } = useDisclosure()
	const finalRefMain = React.useRef(null)

	console.log({ pos, areaType, quantity, company, yieldValue })

	const handleChangeSelectAreaType = (e: React.ChangeEvent<HTMLSelectElement>) => setAreaType(e.target.value);
	const handleChangeAreaType = (type: string) => {
		setAreaType(type)
		setCompany(null)
	}
	const handleChangeQuantity = (e: any) => {
		e <= 0 && setCompany(null)
		setQuantity(e)
	}
	const handleChangeYield = (e: any) => setYieldValue(e)
	const handleChangeCompany = (_company: ICompaniesMock) => setCompany(_company)
	const handleChangePosition = (obj: { lat: number, lng: number }) => setPos(obj)
	const handleResetAddMarkerInfo = () => {
		setAreaType('')
		setQuantity(0)
		setYieldValue(0)
		setCompany(null)
	}
	const handleAddNewMarker = () => {
		dataMock.push({
			id: dataMock.length,
			address: 'TODO - Temporary',
			position: {
				lat: pos!.lat,
				lng: pos!.lng
			},
			energyType: areaType as "windmill" | "solarPanel",
			quantity: quantity,
			energyMade: 0,
			energyNeeded: 2137, // TODO Add energy needed section for user to input 
			energyPerHour: Math.round(company![areaType === 'windmill' ? 'windmills' : 'solarPanels']?.avgPerformance! * quantity * 100) / 100
		})
		setRefreshMap(!refreshMap);
	}

	return (
		<div>
			<TopInterface onOpen={onOpen} />
			<LeftInterface
				handleChangeAreaType={handleChangeAreaType}
				handleChangeQuantity={handleChangeQuantity}
				handleChangeYield={handleChangeYield}
				handleChangeCompany={handleChangeCompany}
				quantity={quantity}
				areaType={areaType}
				yieldValue={yieldValue}
				company={company}
				pos={pos}
				markerInfo={markerInfo}
				handleAddNewMarker={handleAddNewMarker}
			/>
			<Map
				setPos={setPos}
				setMarkerInfo={setMarkerInfo}
				markerInfo={markerInfo}
				handleResetAddMarkerInfo={handleResetAddMarkerInfo}
				dataMock={dataMock}
				refreshMap={refreshMap}
			/>
			<AdminPageModal
				finalRef={finalRefMain}
				isOpen={isOpen}
				onClose={onClose}
				pos={pos}
				areaType={areaType}
				quantity={quantity}
				yieldValue={yieldValue}
				handleChangeSelectAreaType={handleChangeSelectAreaType}
				handleChangeQuantity={handleChangeQuantity}
				handleChangeYield={handleChangeYield}
				handleChangePosition={handleChangePosition}
			/>
		</div>
	)
}
