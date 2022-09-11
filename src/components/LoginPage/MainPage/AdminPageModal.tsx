import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Box, Input, FormControl, FormLabel, Divider, Select} from "@chakra-ui/react"
import React from "react"

interface IProps {
  finalRef: any
  isOpen: boolean
  onClose: () => void
  pos: {lat:number, lng:number} | undefined
  handleChangeSelectAreaType: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleChangeQuantity: (e: any) => void
  handleChangeYield: (e: any) => void
  handleChangePosition: (e: any) => void
}
export const AdminPageModal:React.FC<IProps> = ({finalRef, isOpen, onClose, handleChangePosition, handleChangeSelectAreaType, handleChangeQuantity, handleChangeYield, pos}) => { 

    const valuesArray = [12,12,12,12,12];
    const typesArray = ['Latitude', 'Longitude', 'Type', 'Quantity', 'Yield Guarantee'];


    const sendData = () => {
        
    }

    return (
      <>
        <Box ref={finalRef} tabIndex={-1} aria-label='Focus moved to this box'>

        </Box>
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size='5xl'>
          <ModalOverlay 
            bg='none'
            backdropFilter='auto'
            backdropInvert='80%'
            backdropBlur='2.5px'
          />
          <ModalContent w='100rem'>
            <ModalHeader>Admin Page</ModalHeader>
            <ModalCloseButton />
            <ModalBody  className='flex justify-center'>
             <div className='flex items-center' style={{width: '1000px'}}>
                <FormControl>
                    <Input onChange={(e) => handleChangePosition({...pos, lat:e.target.value})} type='number' className='ml-8 mr-2' style={{width: '148px'}} placeholder="Latitude" />
                    <Input onChange={(e) => handleChangePosition({ ...pos, lng:e.target.value})} type='number' className='ml-2 mr-2' style={{width: '148px'}} placeholder="Longitude" />

                    <Select onChange={handleChangeSelectAreaType} className='ml-2 mr-2' style={{width: '148px'}} placeholder="Type">
                      <option value='solar_panel'>Solar Panel</option>
                      <option value='windmill'>Windmill</option>
                    </Select>

                    <Input onChange={handleChangeQuantity} type='number' className='ml-2 mr-2' style={{width: '148px'}} placeholder="Quantity" />
                    <Input onChange={handleChangeYield} type='number' className='ml-2 mr-8' style={{width: '148px'}} placeholder="Yield Guarantee" />
                    <Button onClick={sendData} bgColor={'teal.500'} color={'white'} style={{margin: "0 0 0.35rem 0" }}>Add</Button>
                    <div className='bg-zinc-400 my-4 ml-6 opacity-40' style={{width: '90%', height: '0.15rem'}}></div>

                    <div className='flex'>
                      {typesArray.map((type, index) => (
                        <FormLabel className='ml-24 mr-2 first:ml-8' key={type}>{type}</FormLabel>
                      ))}
                    </div>
                    
                    <div>
                {valuesArray.map((value, index) => (
                    
                    <Input type='number' className='ml-2 mr-2 first:ml-8' style={{width: '148px', pointerEvents: 'none'}} placeholder="Latitude" readOnly contentEditable='false' key={index}/>
                  

                )
                    )}
                  </div>
                </FormControl>
                
                

             </div>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default AdminPageModal;