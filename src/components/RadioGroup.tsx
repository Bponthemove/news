import React from 'react'
import { useNewsContext } from '../hooks/useNewsContext'

export const RadioGroup = () => {
  const { theme, themeHandler } = useNewsContext()

  return (
    <div 
      className='input-container'
      id={ theme }
      onClick={ themeHandler }
    >
        <input 
          type='checkbox' 
          name='theme' 
          value={ theme } 
          checked={ theme === 'dark' }
          readOnly
          />
        <label 
          htmlFor={`${theme}theme` }        
        >
            <span className='radio-span'>{ theme }</span>
        </label>
    </div>
  )
}
