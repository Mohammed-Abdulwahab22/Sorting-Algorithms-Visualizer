import React, { useContext } from 'react'
import DataContext from './context/DataContext'

export default function ArraySizeSlider() {
  const { arraySize, handleArraySliderChange } = useContext(DataContext);
  return (
    <div className='Array-slider'>
      <label htmlFor='arraySizeSlider'>
        Array Size:{arraySize}
      </label>
      <input
        id='arraySizeSlider'
        type='range'
        min={'10'}
        max={'100'}
        value={arraySize}
        onChange={handleArraySliderChange}
      />
    </div>
  )
}
