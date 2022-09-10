import React from 'react'
import { NavBar } from './NavBar'
import { Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

export const LoginPage = () => {
  return (
    <div className='flex flex-col bg-gradient-to-b from-blue-900 to-neutral-700 overflow-hidden h-[100vh]'>
        <NavBar/>
        <div className='flex justify-end w-[1280px] h-full'>
            <div className='flex my-10'>

                <div className='text-3xl text-white font-bold'>
                    Join <span className='bg-teal-500 rounded-md px-2 py-1'>Lorem</span> now!
                </div>
                
                <div className='flex flex-col justify-center bg-gradient-to-b from-white to-neutral-100 w-[400px] h-[500px] rounded-lg'>
                    <div className='flex flex-col items-center'>
                        <Input width='300px' color='white' placeholder='Login' className='mb-5'/>
                        <Input width='300px' placeholder='Password' className='mb-5' />
                        <Button width='300px' colorScheme='teal' className='mb-5' >Join</Button>
                        <p className='font-bold mb-5'>or</p>
                        <Button width='300px' colorScheme='blue' className='mb-5'>Facebook</Button>
                        <Button width='300px' variant='outline' colorScheme='black' className=''>Google</Button>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}
