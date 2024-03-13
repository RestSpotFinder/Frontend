import EndSearchListContent from './endSearchListContent'
import { useDispatch, useSelector } from 'react-redux'
import { endInitiate } from '@/store/end'
import { endCheckedTrue } from '@/store/end'
import { SearchPlaceDataType, EndSearchListType, EndState } from '@/types'

const EndSearchList = ({ result, setSearch }: EndSearchListType) => {
  const dataArr = result
  const dispatch = useDispatch()
  const isEndChecked = useSelector((state: EndState) => state.end.isChecked)

  const handleDataClick = (data: SearchPlaceDataType) => {
    setSearch({
      endSearchTerm: '',
      startSearchTerm: '',
      waySearchTerm: '',
    })
    dispatch(endInitiate(data))
    dispatch(endCheckedTrue())
  }

  type ValueT = {
    name: string
    category: string
    address: string
    lat: string
    lng: string
    onDataClick: (data: SearchPlaceDataType) => void
  }

  return (
    <div
      className={`absolute z-50  w-80 rounded-b border border-b border-l border-r border-black border-t-white bg-white ${isEndChecked && 'hidden'}`}
    >
      {dataArr?.map((value: ValueT, index: number) => {
        return (
          <EndSearchListContent
            key={index}
            searchPlaceData={value}
            onDataClick={handleDataClick}
          />
        )
      })}
    </div>
  )
}

export default EndSearchList
