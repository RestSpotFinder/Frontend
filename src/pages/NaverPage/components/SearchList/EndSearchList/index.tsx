import SearchListContent from '../SearchListContent'
import { useDispatch, useSelector } from 'react-redux'
import { endCheckedTrue, endInitiate } from '@/store/end'
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

  return (
    <div
      className={`absolute z-50  w-80 rounded-b border border-black border-t-white bg-white ${isEndChecked && 'hidden'}`}
    >
      {dataArr?.map((value: SearchPlaceDataType, index: number) => {
        return (
          <SearchListContent
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
