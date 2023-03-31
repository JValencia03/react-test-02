import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'
import debounce from 'just-debounce-it'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('Pls write something')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('You can\'t put a number')
      return
    }

    if (search.length < 3) {
      setError('Minimun characters are three')
      return
    }

    setError(null)
  }, [search])

  return { error, updateSearch, search }
}

function App () {
  const [sort, setSort] = useState(false)

  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(debounce(search => {
    getMovies({ search })
  }, 400), [])

  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (e) => {
    const newQuery = e.target.value
    if (newQuery.startsWith(' ')) return
    updateSearch(newQuery)
    debouncedGetMovies(newQuery) // Pasamos el search como newQuery porque la idea es que se actualice en tiempo real.
  }

  useEffect(() => {
    console.log('New getMovies received')
  }, [getMovies])

  return (
    <div id='page'>
      <header>
        <h1>OmdbApp</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? '#f00' : 'transparent'
            }} onChange={handleChange} name='search' value={search} type='text' placeholder='Indiana Jones, Avengers, Star Wars...'
          />
          <label>
            Sort by name
            <input type='checkbox' onChange={handleSort} checked={sort} />
          </label>
          <button type='submit'>Submit</button>
        </form>
        {error && <p style={{ color: '#f00' }}>{error}</p>}
      </header>
      <main>
        {
          loading ? <p>loading...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
