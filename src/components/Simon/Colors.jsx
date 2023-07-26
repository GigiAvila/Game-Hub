import React from 'react'
import './Simon.css'

const Colors = ({ color, onClick, flash }) => {
  return (
    <div
      onClick={onClick}
      className={`colorCard ${color} ${flash ? "flash" : ""}`}>

    </div>
  )
}

export default Colors