import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

function App () {
  const { search, setSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search })

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div className='page'>
      <header>
        <h1>Search movies</h1>
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='search' type='text' placeholder='Avengers, Star Wars, The Matrix...' />
          <button>Submit</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        {
        loading ? <p>Loading...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
