import { LocationIcon } from '@/assets/Icons'
import { SearchListContentType, SearchPlaceDataType } from '@/types'

const SearchListContent = ({
  searchPlaceData,
  onDataClick,
}: SearchListContentType) => {
  const { name, lat, lng, category, address } = searchPlaceData
  const handleClick = () => {
    const obj: SearchPlaceDataType = {
      name: name,
      lat: lat,
      lng: lng,
      category: category,
      address: address,
    }
    onDataClick(obj)
  }

  return (
    <div
      className={'flex flex-col hover:bg-gray-300 hover:bg-opacity-30'}
      onClick={handleClick}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="mt-7 flex items-center">
          <LocationIcon className="ml-2" />
          <p className="mb-1">{name}</p>
        </div>
        <p className="mr-3 mt-5 text-sm text-gray-400">{category}</p>
      </div>
      <p className="mb-5 ml-8 text-sm text-slate-600 ">{address}</p>
    </div>
  )
}

export default SearchListContent
