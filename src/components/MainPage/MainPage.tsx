import React from 'react'
import Map from './Map'
import TopInterface from './TopInterface'
import LeftInterface from './LeftInterface'
import AdminPageModal from './AdminPageModal'
import { useDisclosure } from '@chakra-ui/react'


export const MainPage = () => {
  const [areaType, setAreaType] = React.useState<string>('')
  const [quantity, setQuantity] = React.useState<number>(0)
  const [yieldValue, setYieldValue] = React.useState(0)
  const [pos,setPos] = React.useState<{lat:number, lng:number}>()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRefMain = React.useRef(null)

  console.log({pos,areaType,quantity,yieldValue})

  const handleChangeSelectAreaType = (e: React.ChangeEvent<HTMLSelectElement>) => setAreaType(e.target.value);
  const handleChangeAreaType = (type: string) => setAreaType(type)
  const handleChangeQuantity = (e: any) => setQuantity(e)
  const handleChangeYield = (e: any) => setYieldValue(e)
  const handleChangePosition = (obj:{lat:number, lng:number}) => setPos(obj)

  return (
    <div>
      <TopInterface
        onOpen={onOpen}
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
      <LeftInterface
        handleChangeAreaType={handleChangeAreaType}
        handleChangeQuantity={handleChangeQuantity}
        handleChangeYield={handleChangeYield}
        quantity={quantity}
        areaType={areaType}
        yieldValue={yieldValue}
      />
      <Map setPos={setPos}/>
    </div>
  )
}
