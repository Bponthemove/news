import React, { useState } from 'react'
import { useNewsContext } from '../hooks/useNewsContext'
import { Idata } from '../context/NewsContext'

export const ListItem = ({ news }: {news: Idata}) => {
  const { isLoading } = useNewsContext()
  const [imageLoaded, setImageLoaded]=useState<boolean>(false)

  return (
    <li className='list-item' >
      <a  className='text-container'
          href={ news.url }
          target='_blank' 
          rel='noreferrer'
      >
        { news.title }
      </a>
      <div className='img-container'>
        <img
          src={ news.image }
          alt={ news.title }
          className={ `smooth-image image-${ imageLoaded || !isLoading ? 'visible' :  'hidden' }` }
          onLoad={ () => setImageLoaded(true) }
        />
        { (!imageLoaded || isLoading) && (
          <div className='beforeLoad'>
            <span>...loading</span>
          </div>
        )}
      </div>
    </li> 
  )
}
