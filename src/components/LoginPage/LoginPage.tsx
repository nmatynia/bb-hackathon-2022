import React from 'react'
import { NavBar } from './NavBar'
import { Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'

import { useState } from 'react'
import axios from 'axios'
export const LoginPage = () => {

    const [login, setLogin] = useState('');
    const [password,setPassword] = useState('');

    const handleLoginChange = (e:any) => setLogin(e.target.value);
    const handlePasswordChange = (e:any) => setPassword(e.target.value);
    //TODO: Error handeling
    const isError = false;
    const fetchLogin = () =>{
        const results = axios.post('http://10.10.60.98:8080/auth/loginUser',{login,password},{withCredentials: true})
        console.log(results)
    } 
    React.useEffect(()=>{
        fetchLogin()
    },[])
    return (
        <div className='bg-windmills bg-cover bg-no-repeat'>
            <div className='flex flex-col items-center bg-gradient-to-b from-blue-900 to-transparent overflow-hidden h-[100vh]'>
                
                <div className='flex justify-around h-full items-center'>
                    <div className='flex my-10'>

                        <div className='text-white mr-60 mt-32'>
                        <div className='text-6xl text-white font-bold'>Join <span className='bg-teal-500 rounded-md px-2 py-1'>EnerSight</span> now!</div>
                        <div className='text-4xl text-white mt-5'>Best way to have insight <br/> in your energy source.</div>
                        </div>

                        <div className='flex flex-col justify-center bg-gradient-to-b from-white to-neutral-100 w-[400px] h-[500px] rounded-lg shadow-xl'>
                            <div className='flex flex-col items-center space-y-5'>
                                {isError 
                                    ?<Input isInvalid width='300px' placeholder='Login' className='' value={login} onChange={handleLoginChange} focusBorderColor='teal.500'/> 
                                    : <Input width='300px' placeholder='Login' className='' value={login} onChange={handleLoginChange} focusBorderColor='teal.500'/>
                                }
                                {isError 
                                    ?<Input isInvalid width='300px' placeholder='Password' className='' value={password} onChange={handlePasswordChange} focusBorderColor='teal.500'/> 
                                    : <Input width='300px' placeholder='Password' className='' value={password} onChange={handlePasswordChange} focusBorderColor='teal.500'/>
                                }
                                <Button width='300px' colorScheme='teal' className='' >Login</Button>
                                <p className='font-bold mb-5'>or</p>
                                <Button width='300px' colorScheme='blue' className=''>Facebook</Button>
                                <Button width='300px' variant='outline' colorScheme='black' className=''>Google</Button>
                                <Button width='300px' colorScheme='teal' className='' >Join us</Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
