import React from 'react'
import './Loading.css'

const Loading = () => {
  return (
    <div className='body'>
      <div className='container'>
        <div className='loading'>
          <div className='pac-man'>
            <div className='up'></div>
            <div className='down'></div>
          </div>
          <div className='food'>
            <div className='food1'></div>
            <div className='food2'></div>
            <div className='food3'></div>
            <div className='food4'></div>
            <div className='food5'></div>
            <div className='food6'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading