import React from 'react'
import Map from './Map/Map'
import TopInterface  from './TopInterface'
import LeftInterface from './LeftInterface'
import AdminPageModal from './AdminPageModal'
import { useDisclosure } from '@chakra-ui/react'


  

export const MainPage = () => {
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
      <LeftInterface/>
      <Map/>
    </div>
   
  )
}
