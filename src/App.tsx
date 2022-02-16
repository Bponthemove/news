import React from 'react'
import './styles/App.css';
import { FilterButton } from './components/FilterButton';
import { useNewsContext } from './hooks/useNewsContext'
import { RadioGroup } from './components/RadioGroup';
import { ListItem } from './components/ListItem';

export const App = () => {
  
  const { paramQuery, setParamQuery, searchHandler, data, isLoading, loadingError, showMore, ulRef, articlesCountRef,
          errorMsg, clickedCountry, clickedSource, clickedCategory, scrollHandler, morePostsHandler, morePosts } = useNewsContext()
          
  return (
    <div className="App">
      <div className='header'>
{/* Title */}
        <h1>Breaking News</h1>
{/* Container with filter buttons  */}
        <div className='button-container'>
          <FilterButton />
        </div>
{/* Search area */}
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
          <input 
            className='search'
            type='text'
            value={paramQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setParamQuery(e.target.value)}
          />
          <button onClick={ searchHandler } className='button button-round button-blue'>Go</button>
{/* Theme Toggle */}
          <RadioGroup/>
        </form>
      </div>
      <main>
{/* Current filters */}
        <p> Country: { clickedCountry !== '' ? clickedCountry : 'none' }. 
            Source: { clickedSource !== '' ? clickedSource : 'none' }. 
            Category: { clickedCategory !== '' ? clickedCategory : 'none' }.</p>
{/* News List */}
        <ul onScroll={ scrollHandler } ref={ ulRef } >
          { data && data.length !== 0 && !loadingError && !isLoading ? data.map((news, index) => <ListItem key={ index } news={ news }/> ) 
                  : isLoading ? <p>Loading</p>
                  : loadingError ?  <p>{ errorMsg }</p>
                  : <p>No news found!</p> }
        </ul>
{/* Button to appear when scrolled to bottom */}
        <div className={ showMore ? 'more-posts-btn-container show-btn' : 'more-posts-btn-container' }>
          <button 
            className='more-posts-btn button button-big button-red' 
            onClick={ morePostsHandler } 
          >
            { morePosts * 20 < articlesCountRef.current ? <p>more posts<br/><span>&gt;</span></p> : <p>no more news</p>}
          </button>
        </div>
      </main>
    </div>
  );
}

