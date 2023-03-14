import { useRef, useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search }) {
  const [movies, setNewMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const previousSearch = useRef(search)

  const getMovies = async () => {
    if (search === previousSearch.current) return

    try {
      setLoading(true)
      const newMovies = await searchMovies({ search })
      setNewMovies(newMovies)
    } catch (e) {
    } finally {
      // Se ejecuta tanto después del try, como después del catch
      setLoading(false)
    }
  }

  return { movies, getMovies, loading }
}
