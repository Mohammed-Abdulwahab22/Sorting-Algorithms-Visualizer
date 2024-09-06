import React from 'react'

export default function Title() {
  return (
    <div className='Title-container'>
      <p style={{ marginBottom: "8rem", marginRight: "1rem" }}>&copy;</p>
      <p className='Title-text'>Sorting Algorithms Visualizer</p>
      <div className='Title-icon'>
        <img src='src\assets\thunder.png' />
      </div>
    </div>
  )
}
