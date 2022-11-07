import React, { useCallback, useEffect, useState } from 'react'
import HeaderCell from './HeaderCell'
import './SortableTable.css'

function SortableTable({ dataRows, headersRow, loading }) {
  const [sortedRows, setSortedRows] = useState([])

  const sortData = useCallback((direction, headerData) => {
    const searchURL = new URL(window.location)

    switch (direction) {
      case 'ascending':
        setSortedRows((sortedRows) => [...sortedRows].sort((a, b) => {
          return headerData.value === 'string'
            ? a[headerData.name].localeCompare(b[headerData.name])
            : a[headerData.name] - b[headerData.name]
        }))

        searchURL.searchParams.set(headerData.name.toLowerCase(), 'ascending')

        break
      case 'descending':
        setSortedRows((sortedRows) => [...sortedRows].sort((a, b) => {
          return headerData.value === 'string'
            ? -a[headerData.name].localeCompare(b[headerData.name])
            : b[headerData.name] - a[headerData.name]
        }))

        searchURL.searchParams.set(headerData.name.toLowerCase(), 'descending')

        break
      default:
        setSortedRows(dataRows)

        searchURL.searchParams.delete(headerData.name.toLowerCase())
    }

    window.history.pushState({}, '', searchURL)
  }, [dataRows])

  const handleSortClick = (direction, headerData) => {
    sortData(direction, headerData)
  }

  useEffect(() => {
    if (dataRows.length) setSortedRows(dataRows)
  }, [dataRows])

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search)

    headersRow.forEach((headerData) => {
      const queryFromSearchParams = searchParams.get(headerData.name.toLowerCase())

      if (queryFromSearchParams) {
        sortData(queryFromSearchParams, headerData)
      }
    })
  }, [headersRow, sortData])

  return (
    <table className="Table" cellSpacing="0">
      <thead>
        <tr>
          {headersRow.map((headerData) => (
            <HeaderCell key={headerData.name} headerData={headerData} onSortClick={handleSortClick} />
          ))}
        </tr>
      </thead>

      <tbody>
        {loading ? (
          [...Array(5).keys()].map((key) => (
            <tr key={key}>
              {headersRow.map(({ name }) => (
                <td key={name} className="Table-dataCell">
                  <div className="Table-skeleton" />
                </td>
              ))}
            </tr>
          ))
        ) : sortedRows.length ? sortedRows.map((row) => (
          <tr key={row.id}>
            {headersRow.map(({ name }) => (
              <td key={name} className="Table-dataCell">{row[name]}</td>
            ))}
          </tr>
        )) : null}

      </tbody>
    </table>
  )
}

export default SortableTable;