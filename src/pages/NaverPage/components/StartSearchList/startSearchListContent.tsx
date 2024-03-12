import { LocationIcon } from '@/assets/Icons'
import { useState } from 'react'
import { SearchListContentType } from '@/types'

const StartSearchListContent = (props: SearchListContentType) => {
  const { name, category, address, onDataClick, lat, lng } = props
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  type ObjType = {
    name: string
    lat: string
    lng: string
    category: string
    address: string
  }

  const handleClick = () => {
    const obj: ObjType = {
      name: '',
      lat: '',
      lng: '',
      category: '',
      address: '',
    }
    obj.name = name
    obj.lat = lat
    obj.lng = lng
    obj.category = category
    obj.address = address
    onDataClick(obj)
  }
  return (
    <div
      className={'flex flex-col hover:bg-gray-300 hover:bg-opacity-30  '}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="mt-7 flex items-center">
          <LocationIcon className="mr-2" />
          <p className="mb-1">{name}</p>
        </div>
        <p className="mr-3 mt-5 text-sm text-gray-400">{category}</p>
      </div>
      <p className="ml-8 text-sm text-slate-600 ">{address}</p>
    </div>
  )
}

export default StartSearchListContent
