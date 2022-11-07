
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import Search from './components/Search'
import SortableTable from './components/SortableTable'

const DATA_URL = 'https://633ff8e7e44b83bc73c5a282.mockapi.io/api/data/vehicles'
const HEADERS = [
  { name: 'id', value: 'number' },
  { name: 'Color', value: 'string' },
  { name: 'Fuel', value: 'string' },
  { name: 'Vehicle', value: 'string' },
  { name: 'VIN', value: 'string' }
]

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [filteredData, setFilteredData] = useState([])
  const queryFromSearchParams = useMemo(() => {
    const searchParams = new URLSearchParams(document.location.search)

    return searchParams.get('query')
  }, [])
  const [searchQuery, setSearchQuery] = useState(queryFromSearchParams ? queryFromSearchParams : '')

  const filterData = (query) => {
    setFilteredData((data)
      .filter((unit) => Object.values(unit)
        .join(' ')
        .toLowerCase()
        .includes(query.toLowerCase())
      ))
  }

  const handleSearchChange = (newQuery) => {
    setSearchQuery(newQuery)
    filterData(newQuery)
  }

  const fetchData = useCallback(() => {
    setLoading(true)

    fetch(DATA_URL)
      .then((resp) => resp.json())
      .then((data) => {
        setData(data)
      })
      .catch((error) => console.warn(error))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (data) {
      if (queryFromSearchParams) {
        filterData(queryFromSearchParams)
      } else {
        setFilteredData(data)
      }
    }
  }, [queryFromSearchParams, data])

  return (
    <main className="App">
      <div className="App-actions">
        <Search
          onChange={handleSearchChange}
          value={searchQuery}
        />
      </div>

      <SortableTable
        dataRows={filteredData}
        headersRow={HEADERS}
        loading={loading}
      />
    </main>
  )
}

export default App
