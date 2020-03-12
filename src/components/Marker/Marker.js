import React from 'react'
import './Marker.css'
import marker from '../../assets/marker.png'

export default function Marker() {
  return (
    <div>
      <img className='marker-img' src={marker} alt='map marker' />
    </div>
  )
}
