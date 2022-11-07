import React, { useEffect, useState } from 'react'
import AscendingOrderIcon from '../Icons/AscendingOrderIcon'
import DefaultOrderIcon from '../Icons/DefaultOrderIcon'
import DescendingOrderIcon from '../Icons/DescendingOrderIcon'

const ICONS = {
  AscendingOrderIcon: AscendingOrderIcon,
  DefaultOrderIcon: DefaultOrderIcon,
  DescendingOrderIcon: DescendingOrderIcon
}

function HeaderCell({ headerData, onSortClick }) {
  const [icon, setIcon] = useState('DefaultOrderIcon')

  const handleSortClick = () => {
    switch (icon) {
      case 'DefaultOrderIcon':
        setIcon('AscendingOrderIcon')
        onSortClick('ascending', headerData)
        break
      case 'AscendingOrderIcon':
        setIcon('DescendingOrderIcon')
        onSortClick('descending', headerData)
        break
      default:
        setIcon('DefaultOrderIcon')
        onSortClick('default', headerData)
    }
  }

  const Icon = ICONS[icon]

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search)
    const queryFromSearchParams = searchParams.get(headerData.name.toLowerCase())

    if (queryFromSearchParams === 'ascending') {
      setIcon('AscendingOrderIcon')
    } else if (queryFromSearchParams === 'descending') {
      setIcon('DescendingOrderIcon')
    }
  })

  return (
    <th className="HeaderCell">
      <span>{headerData.name}</span>

      <button className="-ml8" onClick={handleSortClick}>
        <Icon />
      </button>
    </th>
  )
}

export default HeaderCell