import React, { useState } from 'react'
import { useNewsContext } from '../hooks/useNewsContext'

export const ListItem = ({ news }: { news: {
                                                link: string,
                                                title: string,
                                                clean_url: string,
                                                media: string,
                                            }}
) => {
  const { isLoading } = useNewsContext()
  const [imageLoaded, setImageLoaded]=useState<boolean>(false)

  return (
    <li className='list-item' >
      <a  className='text-container'
          href={ news.link }
          target='_blank' 
          rel='noreferrer'
      >
        <h2>{ news.title }</h2>
        <p>{ news.clean_url }</p>
      </a>
      <div className='img-container'>
        <img
          src={ news.media }
          alt={ news.clean_url }
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
