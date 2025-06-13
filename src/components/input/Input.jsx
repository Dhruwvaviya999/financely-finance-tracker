import React from 'react'
import './styles.css'

const Input = ({label, state, setState, placeholder, type}) => {
  return (
    <div className='input-wrapper'>
        <p className='label-input'>{label}</p>
        <input className='custom-input' type={type} onChange={(e) => setState(e.target.value)} placeholder={placeholder} />
    </div>
  )
}

export default Input