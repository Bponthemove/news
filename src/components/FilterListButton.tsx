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
                            if (e.currentTarget.id === 'all') setClickedCountry('')
                            else setClickedCountry(e.currentTarget.id) }
                        }
                    >
                        { country }
                    </button>
                    { (country === 'all' && clickedCountry === '') || clickedCountry === country ?
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
                { clickedSource === source || (source === 'All' && clickedSource === '') ? 
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
                        if (e.currentTarget.id === 'all') setClickedCategory('')
                        else setClickedCategory(e.currentTarget.id) }
                    }
                >
                    { category }
                </button>
                { clickedCategory === category || (category === 'all' && clickedCategory === '') ? 
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