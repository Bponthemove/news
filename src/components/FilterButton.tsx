import React, { useState, useEffect } from 'react'
import { FilterListButton } from './FilterListButton'

export const FilterButton = () => {
    const filterOptions: string[] = ['country', 'source', 'category']
    const [clicked, setClicked] = useState(false)
    const [id, setId] = useState('')

    useEffect(() => {
        if (clicked) window.addEventListener("click", closeMenu)
        return () => window.removeEventListener("click", closeMenu)
    }, [clicked])

    const closeMenu = () => {
        if (setClicked) setClicked(false)
    }
    
    const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setClicked(true)
        setId(e.currentTarget.id)
    }

    return(
        <>
            { filterOptions.map(option => (
                <div 
                    id= { option }   
                    key={ option }
                    onClick={ clickHandler }
                    className='dropdown'
                >
                    <button 
                        className='dropdown-btn button-big button-red'
                        id={option}
                    >{ option }</button>
                    <div 
                        className={ clicked && id === option ? 'dropdown-content dropdown-content-visible-onclick' :'dropdown-content' }
                    >
                        <FilterListButton option={ option }/>
                    </div>
                </div>
            ))}
        </>
    )    
}
