import React from 'react'
import './styles.css'

const Button = ({text, onClick, blue, disabled, type}) => {
  return (
    <button type={"submit"} style={{fontSize: '1rem', width: '100%'}} className={blue? 'btn btn-blue' : 'btn'} onClick={onClick} disabled={disabled}>{text}</button>
  )
}

export default Button