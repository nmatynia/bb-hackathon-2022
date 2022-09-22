import React from 'react'
import Map from './Map'
import TopInterface from './TopInterface'
import LeftInterface from './LeftInterface'
import AdminPageModal from './AdminPageModal'
import { useDisclosure } from '@chakra-ui/react'
import { ICompaniesMock, IDataMock } from './dataMock'

export const MainPage = () => {
	const [areaType, setAreaType] = React.useState<string>('')
	const [quantity, setQuantity] = React.useState<number>(0)
	const [yieldValue, setYieldValue] = React.useState(0)
	const [company, setCompany] = React.useState<ICompaniesMock | null>(null)
	const [pos, setPos] = React.useState<{ lat: number, lng: number }>()
	const [markerInfo, setMarkerInfo] = React.useState<IDataMock | null>(null);

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
				markerInfo={markerInfo}
			/>
			<Map
				setPos={setPos}
				setMarkerInfo={setMarkerInfo}
				markerInfo={markerInfo}
				handleResetAddMarkerInfo={handleResetAddMarkerInfo}
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
