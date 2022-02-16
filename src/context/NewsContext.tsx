import React, { createContext, useEffect, useRef, useState } from 'react'
import { useAxios } from '../hooks/useAxios'

type all = {
    paramQuery: string;
    setParamQuery: React.Dispatch<React.SetStateAction<string>>;
    clickedCountry: string; 
    setClickedCountry: React.Dispatch<React.SetStateAction<string>>;
    clickedSource: string; 
    setClickedSource: React.Dispatch<React.SetStateAction<string>>;
    clickedCategory: string; 
    setClickedCategory: React.Dispatch<React.SetStateAction<string>>;
    theme: string;
    morePosts: number;
    setMorePosts: React.Dispatch<React.SetStateAction<number>>;
    showMore: boolean;
    themeHandler: () => void;
    searchHandler: () => void;
    morePostsHandler: () => void ;
    scrollHandler: (e: React.UIEvent<HTMLUListElement>) => void;
    data: {
      url: string,
      title: string,
      source: {
      id: string | null,
      name: string,
      },
      urlToImage: string,
    }[] | undefined;
    countries: string[];
    categories: string[];
    sources: string[];
    isLoading: boolean;
    loadingError: boolean;
    errorMsg: string;
    ulRef: React.LegacyRef<HTMLUListElement>;
    articlesCountRef: React.MutableRefObject<number>;
}

//creating context
export const NewsContext = createContext<all | undefined>(undefined)

export const NewsContextProvider:React.FC = ({ children }) => {
  
    const apiKey = useRef<string>('31a595eff58a46bb8bc63dae6a492be1')
    const [paramQuery, setParamQuery] = useState<string>('')
    const [search, setSearch] = useState<boolean>(false)
    const [morePosts, setMorePosts] = useState<number>(1)
    const [clickedCountry, setClickedCountry] = useState<string>('gb')
    const [clickedSource, setClickedSource] = useState<string>('')
    const [clickedCategory, setClickedCategory] = useState<string>('')
    const [theme, setTheme] = useState<string>('light')
    const [showMore, setShowMore] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [loadingError, setLoadingError] = useState<boolean>(false)
    const [errorMsg, setErrorMsg] = useState<string>('')
    const paramsRef = useRef<object>(null)
    const ulRef = useRef<HTMLUListElement>(null)
    const articlesCountRef = useRef(0)
    const data = useAxios(  isLoading, clickedCountry, clickedSource, clickedCategory, setIsLoading, apiKey, 
                            setLoadingError, setErrorMsg, paramQuery, search, setSearch, morePosts, paramsRef, 
                            articlesCountRef, setParamQuery)

    const countries = [
        'all', 'gb', 'us', 'fr', 'de', 'jp', 'ch', 'nl'
    ]

    const categories = [
        'all', 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'
    ]

    const sources = [
        'bbc-news', 'CNN', 'Bild', 'independent', "abc-news", "al-jazeera-english", "associated-press"
    ]

//scroll to top when new data arrives
    useEffect(() => {
      if (ulRef.current) ulRef.current.scrollTo({ top: 0, behavior: 'auto' })
    }, [data])

//toggle theme
    useEffect(() => {
      if (theme === 'light') {
        document.documentElement.classList.remove('theme-dark')
        document.documentElement.classList.add('theme-light')
      } else {
        document.documentElement.classList.remove('theme-light')
        document.documentElement.classList.add('theme-dark')
      }
    }, [theme])
  
//when scrolled to nearly bottom, button to load more posts will show    
    const scrollHandler = (e: React.UIEvent<HTMLUListElement>) => {
      let offset 
      window.innerWidth < 600 ? offset = 700 : offset = 200
      if (e.currentTarget.scrollTop - offset >= e.currentTarget.offsetHeight) setShowMore(true)
      else setShowMore(false)
    }

//this will load more posts and scroll back to top
    const morePostsHandler = () => {
      if (morePosts * 20 < articlesCountRef.current) setMorePosts(prev => prev + 1)
    }

    const searchHandler = () => {
      setClickedCountry('')
      setClickedSource('')
      setClickedCategory('')
      setSearch(true)
      setMorePosts(1)
    }

    const themeHandler = () => {
      if (theme === 'light') setTheme('dark')
      else setTheme('light')
    }
  
    const value={
        clickedCountry, setClickedCountry, paramQuery, setParamQuery, showMore, setMorePosts,
        searchHandler, data, countries, categories, sources, morePostsHandler, ulRef,
        clickedSource, setClickedSource, clickedCategory, setClickedCategory, morePosts,
        isLoading, themeHandler, theme, loadingError, errorMsg, scrollHandler, articlesCountRef
    }

    return (
    <NewsContext.Provider value={ value }> 
        { children }
    </NewsContext.Provider>
  )
}

