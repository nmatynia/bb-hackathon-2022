import React from 'react'
import Map from './Map/Map'
import TopInterface  from './TopInterface'
import LeftInterface from './LeftInterface'

export const MainPage = () => {
  return (
    <div>
      <TopInterface/>
      <LeftInterface/>
      <Map/>
    </div>
   
  )
}
