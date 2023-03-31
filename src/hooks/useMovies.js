import { useCallback, useMemo, useRef, useState } from 'react'

import { searchMovies } from '../services/movies'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const searchRef = useRef()

  const getMovies = useCallback(async ({ search }) => {
    if (search === searchRef.current) return

    try {
      setLoading(true)
      setError(null)
      searchRef.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [search])

  // Esta forma es correcta, sin embargo, lo ideas sería usar un useMemo, para que ese cálculo solo se ejecute cuando cambia cierta información
  // const getSortedMovies = () => {
  //   console.log('getSortedMovies')
  //   const sortedMovies = sort
  //     ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
  //     : movies

  //   return sortedMovies
  // }

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [movies, sort])

  return { movies: sortedMovies, getMovies, loading, movieError: error, sort }
}
