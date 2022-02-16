import { useContext } from 'react'
import { NewsContext } from '../context/NewsContext'

export const useNewsContext = () => {
    const context = useContext(NewsContext)
    if (context === undefined) {
        throw Error('data in context is undefined')
    } else
    return (
        context
    )
}
