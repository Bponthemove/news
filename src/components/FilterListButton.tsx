import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { useNewsContext } from '../hooks/useNewsContext'

export const FilterListButton = ({ option }: { option: string }) => {
    const { categories, countries, clickedCountry, setClickedCountry, setMorePosts,
            clickedCategory, setClickedCategory } = useNewsContext()

    return (
        <>
            { option === 'country' && countries.map((country: string) => (
                <div 
                    key={ country }
                    className='menu-item-container'
                >
                    <button 
                        id={ country }
                        className='list-btn button-big button-blue'
                        onClick={ (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                            setMorePosts(1)
                            setClickedCountry(e.currentTarget.id) }
                        }
                    >
                        { country }
                    </button>
                    { clickedCountry === country ?
                        <div className='checked-container'>
                            <FaCheck className='check-icon'/>
                        </div>
                        : null }
                </div>))
            }
            { option === 'category' && categories.map((category: string) => (
                <div 
                    key={ category }
                    className='menu-item-container'
                >
                <button 
                    id={ category }
                    className='list-btn button-big button-blue'
                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                        setMorePosts(1)
                        setClickedCategory(e.currentTarget.id) }
                    }
                >
                    { category }
                </button>
                { clickedCategory === category ? 
                    <div className='checked-container'>
                        <FaCheck className='check-icon'/>
                    </div>
                    : null }
            </div>))
            }
        </>
    )
}
