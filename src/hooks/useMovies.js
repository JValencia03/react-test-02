import { useState, useEffect } from 'react'

export function useMovies () {
  const [movies, setMovies] = useState(null)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await fetch('https://www.omdbapi.com/?apikey=1a9f257c&s=Avengers')
        const data = await res.json()
        const { Search } = data
        setMovies(Search)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    getMovies()
  }, [])

  return { movies, loading, error }
}
