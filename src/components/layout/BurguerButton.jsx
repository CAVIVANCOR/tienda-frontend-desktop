/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import Burguer from './BurguerButtonStyles'

export default function BurguerButton(props) {
  return (
    <Burguer>
      <div  onClick={props.handleClick} 
            className={`icon nav-icon-5 ${props.clicked ? 'open' : ''}`}
            >
            <span></span>
            <span></span>
            <span></span>
        </div>
    </Burguer>
  )
}

