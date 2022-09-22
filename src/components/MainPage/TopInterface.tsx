import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList, Tag, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'
import { BiSelection } from 'react-icons/bi'
import { FaUserCircle } from 'react-icons/fa'
import { FiMapPin, FiSettings } from 'react-icons/fi'
import { HiOutlineLogout, HiOutlineTable } from 'react-icons/hi'
import { TbShape2 } from 'react-icons/tb'

interface IProps {
	onOpen: () => void
}

const TopInterface: React.FC<IProps> = ({ onOpen }) => {
	{/* @ts-ignore */ }
	const CustomCard = React.forwardRef(({ children, ...rest }, ref) => (
		<Box>
			{/* @ts-ignore */}
			<Tag ref={ref} {...rest} bgColor={'whiteAlpha.500'}>
				{children}
			</Tag>
		</Box>
	))



	return (
		<div className='fixed w-[90%] top-0 z-10 flex items-center justify-between mx-16 mt-3 rounded-lg h-16 bg-gradient-to-b from-white to-neutral-100 shadow-2xl bg-opacity-90'>
			<h1 className='font-bold text-2xl text-neutral-800 ml-7'>EnerSight</h1>
			<ul className='flex space-x-16 font-bold items-center'>
				{/* @ts-ignore */}
				<Tooltip label='Add new areas' fontSize='md'><CustomCard><AiFillPlusCircle className='w-5 h-5' /></CustomCard></Tooltip>
				{/* @ts-ignore */}
				<Tooltip label='Select' fontSize='md'><CustomCard><BiSelection className='w-5 h-5' /></CustomCard></Tooltip>
				{/* @ts-ignore */}
				<Tooltip label='Add area point' fontSize='md'><CustomCard><FiMapPin className='w-5 h-5' /></CustomCard></Tooltip>
				{/* @ts-ignore */}
				<Tooltip label='Add custom shape area' fontSize='md'><CustomCard><TbShape2 className='w-5 h-5' /></CustomCard></Tooltip>
			</ul>
			<Menu>
				<MenuButton
					as={IconButton}
					aria-label='Options'
					icon={<FaUserCircle className='w-10 h-10 rounded-3xl mr-7' />}
					variant=''
				/>
				<MenuList>
					<MenuItem onClick={onOpen} icon={<HiOutlineTable className='w-5 h-5' />}>
						Admin Panel
					</MenuItem>
					<MenuItem icon={<FiSettings className='w-5 h-5' />}>
						Settings
					</MenuItem>
					<MenuItem icon={<HiOutlineLogout className='w-5 h-5' />}>
						Log out
					</MenuItem>
				</MenuList>
			</Menu>

		</div>
	)
}



export default TopInterface;
