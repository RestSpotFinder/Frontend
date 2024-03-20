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
      className={
        'flex w-full items-center justify-center gap-2 px-3 py-3 hover:bg-gray-300 hover:bg-opacity-30'
      }
      onClick={handleClick}
    >
      <LocationIcon className="h-6 w-6 shrink-0" />
      <div className="flex h-full w-full flex-col items-center justify-between gap-1.5">
        <div className="flex w-full items-center justify-between">
          <p className="">{name}</p>
          <p className="text-xs text-gray-400">{category}</p>
        </div>
        <p className="w-full justify-start text-[0.8rem] text-slate-600">
          {address}
        </p>
      </div>
    </div>
  )
}

export default SearchListContent
