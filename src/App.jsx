import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useState } from 'react'

function App () {
  const { movies } = useMovies()
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ query })
  }

  const handleChange = (event) => {
    const newQuery = event.target.value
    setQuery(newQuery)

    if (newQuery === '') {
      setError('Pls write something...')
      return
    }

    if (newQuery.match(/^\d+$/)) {
      setError('Numbers are not valid')
      return
    }

    if (newQuery < 3) {
      setError('You must have at least three letters')
      return
    }

    setError(null)
  }

  return (
    <div id='page'>
      <header>
        <h1>OmdbApp</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={query} name='query' type='text' placeholder='Indiana Jones, Avengers, Star Wars...' />
          <button type='submit'>Submit</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
