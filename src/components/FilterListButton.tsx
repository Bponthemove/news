import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { useNewsContext } from '../hooks/useNewsContext'

export const FilterListButton = ({ option }: { option: string }) => {
    const { categories, sources, countries, clickedCountry, setClickedCountry, setMorePosts,
            clickedSource, setClickedSource, clickedCategory, setClickedCategory } = useNewsContext()

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
                            setClickedSource('')
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
            { option === 'source' && sources.map((source: string) => (
                <div 
                    key={ source }
                    className='menu-item-container'
                >
                <button 
                    id={ source }
                    className='list-btn button-big button-blue'
                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                        setClickedCategory('')
                        setClickedCountry('')
                        setMorePosts(1)
                        setClickedSource(e.currentTarget.id) }
                    }
                >
                    { source }
                </button>
                { clickedSource === source ? 
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
                        setClickedSource('')
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

// https://newsapi.org/v2/top-headlines?country=de?category=business&from=2022-02-10&sortBy=popularity&apiKey=31a595eff58a46bb8bc63dae6a492be1
// https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=API_KEY