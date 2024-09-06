import React, { useContext } from 'react'
import DataContext from './context/DataContext'

export default function BubbleSort() {
    const { bars } = useContext(DataContext)


    return (
        <div className='Bars-container'>
            {bars.map((height, index) => (
                <div
                    key={index}
                    className='bar'
                    style={{ height: `${height}px` }}
                />
            ))}

        </div>
    )
}
