import React from "react"

import {
  Button, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, ModalFooter, Input, FormControl, FormLabel, Select
} from "@chakra-ui/react"

interface IProps {
  finalRef: any
  isOpen: boolean
  onClose: () => void
  pos: { lat: number, lng: number } | undefined
  handleChangeSelectAreaType: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleChangeQuantity: (e: any) => void
  handleChangeYield: (e: any) => void
  handleChangePosition: (e: any) => void

  areaType: string;
  quantity: number;
  yieldValue: number;
}

export const AdminPageModal: React.FC<IProps> = (
  { 
    finalRef, 
    isOpen, 
    onClose, 
    handleChangePosition, 
    handleChangeSelectAreaType, 
    handleChangeQuantity, 
    handleChangeYield, 
    pos, 
    areaType, 
    quantity, 
    yieldValue 
  }) => {

  const valuesArray: any = [{ lat: -52.123, lng: 21.372, type: "Solar Panel", quantity: 100, yield: '30%' },
  { lat: -122.123, lng: 5.372, type: "Wind Mill", quantity: 140, yield: '25%' },
  { lat: -22.123, lng: 12.372, type: "Solar Panel", quantity: 40, yield: '30%' }];
  const typesArray = ['Latitude', 'Longitude', 'Type', 'Quantity', 'Yield Guarantee'];


  const verifyInputAndSendData = (val: any) => {

    console.log(yieldValue);
    sendData();

  }
  function checkValidInput() {
    //TODO
    // if (pos?.lat <= 180.0 && pos?.lat >= -180.0 && pos?.lng <= 90.0  && pos?.lng >= -90.0 && areaType && quantity && yieldValue) {
    //   return true;
    // }
    // return false;
    console.log("Sprawdzanie diała")
  }



  const sendData = () => {
    //TODO
  }

  return (
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size='6xl'>
        <ModalOverlay
          bg='none'
          backdropFilter='auto'
          backdropInvert='80%'
          backdropBlur='2.5px'
        />
        <ModalContent w='100rem'>
          <ModalHeader>Admin Page</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div style={{ width: '1000px' }}>

              <FormControl className='ml-6 grid grid-cols-6 gap-4'>
                <Input onChange={(e) => handleChangePosition({ ...pos, lat: e.target.value })} type='number' style={{ width: '148px' }} placeholder="Latitude" />
                <Input onChange={(e) => handleChangePosition({ ...pos, lng: e.target.value })} type='number' style={{ width: '148px' }} placeholder="Longitude" />

                <Select onChange={handleChangeSelectAreaType} width={148} placeholder="Type">
                  <option value='solar_panel'>Solar Panel</option>
                  <option value='windmill'>Windmill</option>
                </Select>

                <Input onChange={handleChangeQuantity} type='number' style={{ width: '148px' }} placeholder="Quantity" />
                <Input onChange={handleChangeYield} type='text' style={{ width: '148px' }} placeholder="Yield Guarantee" />
                <Button onClick={verifyInputAndSendData} bgColor={'teal.500'} color={'white'} style={{ margin: "0 2rem 0.35rem 0" }}>Add</Button>
              </FormControl>

              <div className='bg-zinc-400 my-4 ml-6 opacity-40' style={{ width: '95%', height: '0.15rem' }}></div>
              <div className='ml-8 grid grid-cols-6 gap-8'>
                {typesArray.map((type, index) => (
                  <FormLabel key={type}>{type}</FormLabel>
                ))}

              </div>

              {valuesArray.map((value: any, id: any) => (
                <div key={id}>
                  <Input className='ml-2 mr-2 first:ml-8' style={{ width: '148px', pointerEvents: 'none' }} readOnly contentEditable='false' value={value.lat} key={value.lat} />
                  <Input className='ml-2 mr-2 first:ml-8' style={{ width: '148px', pointerEvents: 'none' }} readOnly contentEditable='false' value={value.lng} key={value.lng} />
                  <Input className='ml-2 mr-2 first:ml-8' style={{ width: '148px', pointerEvents: 'none' }} readOnly contentEditable='false' value={value.type} key={value.type} />
                  <Input className='ml-2 mr-2 first:ml-8' style={{ width: '148px', pointerEvents: 'none' }} readOnly contentEditable='false' value={value.quantity} key={value.quantity} />
                  <Input className='ml-2 mr-2 first:ml-8' style={{ width: '148px', pointerEvents: 'none' }} readOnly contentEditable='false' value={value.yield} key={value.yieldValue} />
                </div>
              ))}
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>

        </ModalContent>
      </Modal>
  )
}

export default AdminPageModal;