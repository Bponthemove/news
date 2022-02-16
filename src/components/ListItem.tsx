import React from 'react'

export const ListItem = ({ news }: { news: {
                                                url: string,
                                                title: string,
                                                source: {
                                                id: string | null,
                                                name: string,
                                                },
                                                urlToImage: string,
                                            }}
) => {
  return (
    <li className='list-item' >
              <a  className='text-container'
                  href={ news.url }
                  target='_blank' 
                  rel='noreferrer'
              >
                <h2>{ news.title }</h2>
                <p>{ news.source.name }</p>
              </a>
              <div 
                className='img-container' 
                style={{backgroundImage: `url(${news.urlToImage})`}}
                title='no image'
              ></div>
            </li> 
  )
}
