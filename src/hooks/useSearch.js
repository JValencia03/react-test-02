import { useRef, useState, useEffect } from 'react'

export function useSearch () {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No results, please write something.')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('You can\'t use special characters like $')
      return
    }

    if (search.length < 3) {
      setError('Search must have at least three characters')
      return
    }

    setError(null)
  }, [search])

  return { search, setSearch, error }
}
