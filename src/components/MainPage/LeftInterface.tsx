import React from 'react'
import { companiesMock, ICompaniesMock, IDataMock } from './dataMock'

import {
  FormControl, FormLabel, IconButton, Divider, Tooltip, Button,
  NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
  Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark
} from '@chakra-ui/react'

import { FaSolarPanel } from 'react-icons/fa'
import { TbWindmill } from 'react-icons/tb'
interface IProps {
  areaType: string,
  quantity: number,
  yieldValue: number,
  company: ICompaniesMock | null
  handleChangeAreaType: (type: string) => void
  handleChangeQuantity: (e: any) => void
  handleChangeYield: (e: any) => void
  handleChangeCompany: (_company: ICompaniesMock) => void
  markerInfo: IDataMock | null;
}
//TODO: retrieve data from backend to display 


const LeftInterface: React.FC<IProps> = ({
  handleChangeAreaType,
  handleChangeQuantity,
  handleChangeYield,
  handleChangeCompany,
  areaType,
  quantity,
  company,
  yieldValue,
  markerInfo
}) => {

  const [showTooltip, setShowTooltip] = React.useState(false)

  const estTarget = (energyNeeded: number, energyMade: number, energyPerHour: number) => {
    const estInHours = (energyNeeded - energyMade) / energyPerHour
    const days = Math.floor(estInHours / 24)
    const hours = Math.round(estInHours % 24)
    return estInHours > 0 ? (
      <>
        {days !== 0 && (
          <div className='flex'>
            {days}<div className='ml-1 text-sm mr-3'>days</div>
          </div>
        )}
        {days !== 0 && hours !== 0
          ? <div className='flex'>
            {hours}<div className='ml-1 text-sm'>hours</div>
          </div>
          : <div className='text-3xl'>
            less than {hours} hours
          </div>
        }
      </>
    ) : false
  }

  const energyGatheredColor = (energyNeeded: number, energyMade: number) => {
    const goalPrecentage = Math.round(energyMade / energyNeeded * 100);
    if (goalPrecentage < 50) {
      return 'text-red-300'
    }
    else if (goalPrecentage >= 50 && goalPrecentage < 75) {
      return 'text-orange-300'
    }
    else if (goalPrecentage >= 75 && goalPrecentage <= 99) {
      return 'text-green-300'
    } else {
      return 'text-green-700'
    }
  }

  return (
    <div className='fixed min-w-[300px] max-w-[400px] top-0 mt-[100px] z-10 flex flex-col mx-16 rounded-lg  bg-gradient-to-b from-white to-neutral-100 shadow-2xl bg-opacity-90'>
      <h1 className='font-semibold text-2xl text-neutral-800 m-7 mb-5'>{markerInfo?.address ?? 'Google Geocoding API'}</h1>
      {markerInfo
        ? <div>
          <Divider />
          <FormLabel className='mt-5 ml-7'>Live power output:</FormLabel>
          <div className='flex font-semibold text-5xl text-neutral-800 mt-5 mb-5 ml-7'>
            {markerInfo?.energyPerHour}
            <div className='ml-1 text-sm'>kWh / hour</div>
          </div>
          <Divider />
          <FormLabel className='mt-5 ml-7'>Energy gathered:</FormLabel>
          <div className={`flex font-semibold text-5xl ${energyGatheredColor(markerInfo?.energyNeeded, markerInfo.energyMade)} mt-5 mb-5 ml-7`}>
            {markerInfo?.energyMade}
            <div className='ml-1 text-sm'>kWh</div>
          </div>
          <Divider />
          <FormLabel className='mt-5 ml-7'>Energy needed:</FormLabel>
          <div className='flex font-semibold text-5xl text-neutral-800 mt-5 mb-5 ml-7'>
            {markerInfo?.energyNeeded}
            <div className='ml-1 text-sm'>kWh</div>
          </div>
          <Divider />
          {estTarget(markerInfo.energyNeeded, markerInfo.energyMade, markerInfo.energyPerHour) &&
            <>
              <FormLabel className='mt-5 ml-7'>Estimated target:</FormLabel>
              <div className='flex font-semibold text-5xl text-neutral-800 mt-5 mb-5 ml-7'>
                {estTarget(markerInfo.energyNeeded, markerInfo.energyMade, markerInfo.energyPerHour)}
              </div>
            </>
          }
        </div>
        : <div className='flex flex-col justify-center'>
          <FormControl className='flex flex-col mb-7'>
            <FormLabel className='ml-7'>Area Type</FormLabel>
            <div className='flex ml-7 space-x-7'>
              <IconButton
                bgColor={areaType === 'solarPanel' ? 'blackAlpha.800' : 'transparent'}
                color={areaType === 'solarPanel' ? 'white' : 'blackAlpha.800'}
                variant={'outline'}
                aria-label='Solar Panel'
                icon={<FaSolarPanel />}
                size='lg'
                onClick={() => handleChangeAreaType('solarPanel')}
              />
              <IconButton
                bgColor={areaType === 'windmill' ? 'blackAlpha.800' : 'transparent'}
                color={areaType === 'windmill' ? 'white' : 'blackAlpha.800'}
                variant={'outline'}
                aria-label='Windmill'
                icon={<TbWindmill />}
                size='lg'
                onClick={() => handleChangeAreaType('windmill')}
              />
            </div>
          </FormControl>
          {areaType !== '' &&
            <div>
              <Divider className='mb-7' />
              <FormLabel className='ml-7'>{areaType === 'solarPanel' ? 'Surface Area in Square Meters ' : 'Quanity of Windmills'}</FormLabel>
              <NumberInput defaultValue={0} min={0} width={150} className='ml-7 mb-7' onChange={handleChangeQuantity}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </div>
          }
          {quantity > 0 &&
            <div>
              <Divider className='mb-7' />
              <FormLabel className='ml-7'>Provider</FormLabel>
              {companiesMock
                .filter(c => (areaType === 'solarPanel' && c.solarPanels) || (areaType === 'windmill' && c.windmills))
                .map((companyData, idx) => (
                  <div
                    key={idx}
                    className={`rounded-lg border-[1px] mx-7 first:my-0 my-3 hover:cursor-pointer ${company === companyData ? 'text-white bg-neutral-800' : ''}`}
                    onClick={() => handleChangeCompany(companyData)}
                  >
                    <header className='text-xl ml-7 my-7 font-bold'>{companyData.name}</header>
                    <p className='ml-7'>Avg. Performance: {Math.round(companyData[areaType === 'windmill' ? 'windmills' : 'solarPanels']?.avgPerformance! * quantity * 100) / 100}</p>
                    <p className='ml-7 mb-7'>Total costs: {Math.round(companyData[areaType === 'windmill' ? 'windmills' : 'solarPanels']?.cost! * quantity * 100) / 100}</p>
                  </div>
                ))}
            </div>
          }
          {company &&
            <div>
              <Divider className='mb-7' />
              <FormLabel className='ml-7'>Yield Guarentee</FormLabel>
              <Slider
                id='slider'
                defaultValue={0}
                min={0}
                max={100}
                width={'80%'}
                className='ml-7 mb-7'
                colorScheme='null'//blackAlpha.800
                onChange={handleChangeYield}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
                  25%
                </SliderMark>
                <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
                  50%
                </SliderMark>
                <SliderMark value={75} mt='1' ml='-2.5' fontSize='sm'>
                  75%
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <Tooltip
                  hasArrow
                  bg='blackAlpha.800'
                  color='white'
                  placement='top'
                  isOpen={showTooltip}
                  label={`${yieldValue}%`}
                >
                  <SliderThumb />
                </Tooltip>
              </Slider>
            </div>
          }

          {
            yieldValue > 0 &&
            <Button color={'white'} bgColor={'teal.500'} borderTopRadius={0} className="mt-7">
              Add
            </Button>
          }

        </div>
      }

    </div>
  )
}

export default LeftInterface