import React from 'react'
import { Button } from '@chakra-ui/react'

export const NavBar = () => {
      
  return (
    <div className='flex items-center justify-between w-[100% - 128px] mx-16 mt-8 mb-4 rounded-lg h-20 bg-gradient-to-b from-white to-neutral-100 shadow-2xl'>
        <h1 className='font-bold text-2xl text-neutral-800 ml-7'>Lorem</h1>
        <div className='mr-7 space-x-6'>
            <Button colorScheme='teal' variant='outline'>Login</Button>
            <Button colorScheme='teal'>Join</Button>
        </div>
    </div>
  )
}
