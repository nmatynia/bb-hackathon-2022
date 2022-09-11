import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Box, Input, FormControl, FormLabel, Divider} from "@chakra-ui/react"
import React from "react"


export const AdminPageModal = (props:any) => { 

    const valuesArray = [12,12,12,12,12];
    const typesArray = ['Latitute', 'Longitude', 'Type', 'Quantity', 'Yield Guarantee'];


    const sendData = () => {
        
    }

    return (
      <>
        <Box ref={props.finalRef} tabIndex={-1} aria-label='Focus moved to this box'>

        </Box>
        <Modal finalFocusRef={props.finalRef} isOpen={props.isOpen} onClose={props.onClose} size='5xl'>
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
                    <Input type='number' className='ml-8 mr-2' style={{width: '148px'}} placeholder="Latitude" />
                    <Input type='number' className='ml-2 mr-2' style={{width: '148px'}} placeholder="Longitude" />
                    <Input type='number' className='ml-2 mr-2' style={{width: '148px'}} placeholder="Type" />
                    <Input type='number' className='ml-2 mr-2' style={{width: '148px'}} placeholder="Quantity" />
                    <Input type='number' className='ml-2 mr-8' style={{width: '148px'}} placeholder="Yield Guarantee" />
                    <Button onClick={sendData} bgColor={'teal.500'} color={'white'} style={{margin: "0 0 0.35rem 0" }}>Add</Button>
                    <div className='bg-zinc-400 my-4 ml-6 opacity-40' style={{width: '90%', height: '0.15rem'}}></div>

                    <div className='flex'>
                      {typesArray.map((type, index) => (
                        <FormLabel className='ml-24 mr-2 first:ml-8'>{type}</FormLabel>
                      ))}
                    </div>
                    
                    <div>
                {valuesArray.map((value) => (
                    
                    <Input type='number' className='ml-2 mr-2 first:ml-8' style={{width: '148px', pointerEvents: 'none'}} placeholder="Latitude" value={value} contentEditable='false'/>
                  

                )
                    )}
                  </div>
                </FormControl>
                
                

             </div>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={props.onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default AdminPageModal;