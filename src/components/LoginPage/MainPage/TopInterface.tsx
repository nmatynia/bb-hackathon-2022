import React from 'react'
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'

const TopInterface = () => {
  return (
    <div className='fixed w-[90%] top-0 z-10 flex items-center justify-between mx-16 mt-3 rounded-lg h-16 bg-gradient-to-b from-white to-neutral-100 shadow-2xl bg-opacity-90'>
      <h1 className='font-bold text-2xl text-neutral-800 ml-7'>Lorem</h1>
      <ul className='flex space-x-16 font-bold'>
        <li>A</li>
        <li>B</li>
        <li>C</li>
        <li>D</li>
      </ul>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<div className='w-11 h-11 bg-neutral-500 rounded-3xl mr-7'></div>}
          variant=''
        />
        <MenuList>
          {/* <MenuItem icon={<AddIcon />}>
            New Tab
          </MenuItem>
          <MenuItem icon={<ExternalLinkIcon />}>
            New Window
          </MenuItem>
          <MenuItem icon={<RepeatIcon />}>
            Open Closed Tab
          </MenuItem>
          <MenuItem icon={<EditIcon />}>
            Open File...
          </MenuItem> */}
        </MenuList>
      </Menu>
      
    </div>
  )
}

export default TopInterface;
