import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Idata = {
    url: string,
    title: string,
    source: {
    id: string | null,
    name: string,
    },
    urlToImage: string,
}

export const useAxios = ( isLoading: boolean, clickedCountry: string, clickedSource: string, clickedCategory: string, 
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, apiKey: React.MutableRefObject<string>, 
    setLoadingError: React.Dispatch<React.SetStateAction<boolean>>, setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
    paramQuery: string, search: boolean, setSearch: React.Dispatch<React.SetStateAction<boolean>>, morePosts: number, 
    paramsRef: {current: object | null}, articlesCountRef: {current: number}, setParamQuery: React.Dispatch<React.SetStateAction<string>>
    //these are parameters, so keep in correct order!
) => {
    const [data, setData] = useState<Idata[] | undefined>(undefined)
    
    useEffect(() => {
        if (!isLoading) setIsLoading(prev => !prev)
        fetchData()
    }, [clickedCategory, clickedCountry, clickedSource])

    useEffect(() => {
        if (search || morePosts > 0) fetchData()
    }, [search, morePosts])

    const fetchData = () => {
        console.log(paramQuery)
        //last seven days
        const days = new Date(Date.now() - 604800000).toISOString().slice(0,10)
        let params
        let url
        if (morePosts > 1 && paramsRef) {
            //show more posts button clicked, so same url as previous
            params = { ...paramsRef.current, page: morePosts }
        } else {
            //new request
            //country and category can mixed as params, source can't. So source and query always go on their own..
            if (clickedSource !== '' ) params = { sources: clickedSource, from: days }
            if (clickedCategory !== '') params = { category: clickedCategory, from: days }
            if (clickedCountry !== '') params = { country: clickedCountry, from: days }
            if (clickedCountry !== '' && clickedCategory !== '') params = { category: clickedCategory, country: clickedCountry, from: days }
            if (paramQuery !== '') params = {...params, q: paramQuery }
            if (params !== undefined) {
                params = {...params, sortBy: "popularity", page: morePosts }
            } else {
                params = { q: 'breaking' }
            }
        }
        if (paramQuery === '' && params) url = "https://newsapi.org/v2/top-headlines"
        else url = "https://newsapi.org/v2/everything"
        
        axios({
            method: "GET",
            url: url,
            params: params,
            headers: {"X-Api-Key": apiKey.current} 
        })
        .then(response => {
            setData(response.data.articles)
            //save current parameters and amount of articles
            paramsRef.current = response.config.params
            articlesCountRef.current = response.data.totalResults
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
