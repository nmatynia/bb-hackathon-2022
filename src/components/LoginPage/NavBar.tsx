import React from 'react'
import { Button } from '@chakra-ui/react'

export const NavBar = () => {
      
  return (
    <div className='flex items-center justify-between w-[100% - 128px] mx-16 mt-3 rounded-lg h-16 bg-slate-100'>
        <h1 className='font-bold text-2xl text-neutral-800 ml-7'>Lorem</h1>
        <div className='mr-7 space-x-6'>
            <Button colorScheme='teal' variant='outline'>Login</Button>
            <Button colorScheme='teal'>Join</Button>
        </div>
    </div>
  )
}
