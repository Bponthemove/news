import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Idata } from '../context/NewsContext'



export const useAxios = ( 
    isLoading: boolean, 
    clickedCountry: string, 
    clickedCategory: string, 
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, 
    apiKey: React.MutableRefObject<string>, 
    setLoadingError: React.Dispatch<React.SetStateAction<boolean>>, 
    setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
    paramQuery: string, search: boolean, 
    setSearch: React.Dispatch<React.SetStateAction<boolean>>, 
    morePosts: number, 
    paramsRef: {current: object | null}, 
    articlesCountRef: {current: number}, 
    setParamQuery: React.Dispatch<React.SetStateAction<string>>
    //these are parameters, so keep in correct order!
) => {
    const [data, setData] = useState<Idata[] | undefined>(undefined)

//on first load
    useEffect(() => {
        fetchData()
    }, [])
    
//when choosing a filter
    useEffect(() => {
        if (( clickedCategory !== '' || clickedCountry!== '') && !isLoading) {
            setIsLoading(true)
            fetchData()
        }
    }, [clickedCategory, clickedCountry])

//when request a search query or ask for more posts
    useEffect(() => {
        if ((search || morePosts > 1) && !isLoading) {
            setIsLoading(true)
            fetchData()
        }
    }, [search, morePosts])
    
    const fetchData = () => {
        
        const days = new Date(Date.now() - (86400000 * 3)).toISOString()
        let params
        let url
        if (morePosts > 1 && paramsRef.current) {
            //show more posts button clicked, so same url including params as previous, just change morePosts to paginate
            params = { ...paramsRef.current, page: morePosts }
            "when" in paramsRef.current ? url = `https://gnews.io/api/v4/top-headlines?token=${apiKey.current}` : url = `https://gnews.io/api/v4/search?token=${apiKey.current}`
        } 
        else {
            if (paramQuery !== '') {
                //search query
                params = { q: '"'+paramQuery+'"', from: days, lang: 'en', max: 10 }
            } 
            else if (clickedCountry === 'all' && clickedCategory === 'all') {
                params = { from: days, lang: 'en' }
            }
            else {
                //new request
                if (clickedCountry !== 'all' && clickedCategory !== 'all') params = { topic: clickedCategory, country: clickedCountry, from: days }
                if (clickedCategory !== 'all') params = { topic: clickedCategory, from: days }
                if (clickedCountry !== 'all') params = { country: clickedCountry, from: days }
                params = {...params, max: 10 }
            }
            paramQuery === '' ? url = `https://gnews.io/api/v4/top-headlines?token=${apiKey.current}` : url = `https://gnews.io/api/v4/search?token=${apiKey.current}`
        }
        
        axios({
            method: "GET",
            url: url,
            params: params,              
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
        .finally(() => {
            if (paramQuery !== '') setParamQuery('')
            if (search) setSearch(false)
            setIsLoading(false)
        })
    }  
    return data
}
