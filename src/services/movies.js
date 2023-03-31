const API_KEY = '1a9f257c'

export const searchMovies = async ({ search }) => {
  if (search === '') return null

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    const data = await response.json()

    const movies = data.Search

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year
    }))
  } catch (e) {
    throw new Error('No searching movies')
  }
}
