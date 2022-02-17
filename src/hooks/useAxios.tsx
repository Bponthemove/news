import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Idata = {
    link: string,
    title: string,
    clean_url: string,
    media: string,
}

export const useAxios = ( isLoading: boolean, clickedCountry: string, clickedSource: string, clickedCategory: string, 
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, apiKey: React.MutableRefObject<string>, 
    setLoadingError: React.Dispatch<React.SetStateAction<boolean>>, setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
    paramQuery: string, search: boolean, setSearch: React.Dispatch<React.SetStateAction<boolean>>, morePosts: number, 
    paramsRef: {current: object | null}, articlesCountRef: {current: number}, setParamQuery: React.Dispatch<React.SetStateAction<string>>
    //these are parameters, so keep in correct order!
) => {
    const [data, setData] = useState<Idata[] | undefined>(undefined)

//on first load
    useEffect(() => {
        fetchData()
    }, [])
    
//when choosing a filter
    useEffect(() => {
        if (( clickedCategory !== '' || clickedCountry!== '' || clickedSource !== '') && !isLoading) {
            setIsLoading(true)
            fetchData()
        }
    }, [clickedCategory, clickedCountry, clickedSource])

//when request a search query or ask for more posts
    useEffect(() => {
        if ((search || morePosts > 1) && !isLoading) {
            setIsLoading(true)
            fetchData()
        }
    }, [search, morePosts])
    
    const fetchData = () => {
        //last seven days
        const days = new Date(Date.now() - 604800000).toISOString().slice(0,10)
        let params
        let url
        if (morePosts > 1 && paramsRef.current) {
            //show more posts button clicked, so same url as previous
            params = { ...paramsRef.current, page: morePosts }
            "when" in paramsRef.current ? url = "https://api.newscatcherapi.com/v2/latest_headlines" : url = "https://api.newscatcherapi.com/v2/search"
        } else {
            if (paramQuery !== '') {
                //search query
                params = { q: '"'+paramQuery+'"', from: days, lang: 'en', to_rank: 10000, page_size: 20 }
            } else {
                //new request
                if (clickedSource !== '' ) params = { sources: clickedSource, when: '7d' }
                if (clickedCategory !== '') params = { topic: clickedCategory, when: '7d' }
                if (clickedCountry !== '') params = { countries: clickedCountry, when: '7d' }
                if (clickedCountry !== '' && clickedCategory !== '') params = { topic: clickedCategory, countries: clickedCountry, when: '7d' }
                params = {...params, page_size: 20, lang: 'en', page: morePosts }
            }
            paramQuery === '' ? url = "https://api.newscatcherapi.com/v2/latest_headlines" : url = "https://api.newscatcherapi.com/v2/search"
        }
        
        axios({
            method: "GET",
            url: url,
            params: params,
            headers: {  "X-Api-Key": apiKey.current,  
                        "Access-Control-Allow-Origin": "http://localhost:3000" 
                    }                 
        })
        .then(response => {
            setData(response.data.articles)
            //save current parameters and amount of articles
            paramsRef.current = response.config.params
            articlesCountRef.current = response.data.total_hits
        })
        .catch(err => {
            setLoadingError(true)
            setErrorMsg(err.response.data.message) 
        })
        if (paramQuery !== '') setParamQuery('')
        if (search) setSearch(false)
        setIsLoading(false)
    }  

    return data
}
