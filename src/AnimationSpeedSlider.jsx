import React, { useContext } from 'react'
import DataContext from './context/DataContext'

export default function AnimationSpeedSlider() {
  const { animationSpeed, handleAnimationSpeed } = useContext(DataContext)
  return (
    <div>
      <div className='Animation-slider'>
        <label htmlFor='animationSlider'>
          Animation speed (ms):{animationSpeed}
        </label>
        <input
          id='animationSlider'
          type='range'
          min={'20'}
          max={'1000'}
          value={animationSpeed}
          onChange={handleAnimationSpeed}
        />
      </div>
    </div>
  )
}
