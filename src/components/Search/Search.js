import React from 'react'

function Search({ onChange, value }) {
  const handleInputChange = (event) => {
    onChange(event.target.value)

    const searchURL = new URL(window.location)

    if (event.target.value) {
      searchURL.searchParams.set('query', event.target.value)
    } else {
      searchURL.searchParams.delete('query')
    }

    window.history.pushState({}, '', searchURL)
  }

  return (
    <input onChange={handleInputChange} placeholder="Search here..." type="text" value={value} />
  )
}

export default Search