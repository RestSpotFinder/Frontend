import { LocationIcon } from '@/assets/Icons'
import { useState } from 'react'
import { ListContentType } from '@/types'

const ListContent = (props: ListContentType) => {
  const { name, category, address } = props
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      className={`flex flex-col ${isHovered ? 'bg-green-300 bg-opacity-50' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="mt-7 flex items-center">
          <LocationIcon className="mr-2" />
          <p>{name}</p>
        </div>
        <p className="ml-2 mt-5 text-sm text-gray-300">{category}</p>
      </div>
      <p className="text-sm text-slate-600">{address}</p>
    </div>
  )
}

export default ListContent
