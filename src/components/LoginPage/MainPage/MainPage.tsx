import React from 'react'
import Map from './Map/Map'
import TopInterface from './TopInterface'
import LeftInterface from './LeftInterface'
import AdminPageModal from './AdminPageModal'
import { useDisclosure } from '@chakra-ui/react'


  

export const MainPage = () => {
  const [areaType, setAreaType] = React.useState<string>('')
  const [quantity, setQuantity] = React.useState<number>(0)
  const [yieldValue, setYieldValue] = React.useState(0)
  const [pos,setPos] = React.useState<{lat:number, lng:number}>()

  console.log({pos,areaType,quantity,yieldValue})

  const handleChangeAreaType = (type: string) => setAreaType(type)
  const handleChangeQuantity = (e: any) => setQuantity(e)
  const handleChangeYield = (e: any) => setYieldValue(e)
  // const handleChangePosition = (obj:{lat:number, lng:number}) => setPos(obj)

  const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRefMain = React.useRef(null)
  return (
    <div>
      <TopInterface
        onOpen={onOpen}
      />
      <AdminPageModal
       finalRef={finalRefMain}
        isOpen={isOpen}
        onClose={onClose}
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
