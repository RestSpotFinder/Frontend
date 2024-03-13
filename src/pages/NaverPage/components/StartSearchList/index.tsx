import StartSearchListContent from './startSearchListContent'
import { useDispatch, useSelector } from 'react-redux'
import { startChekcedTrue, startInitiate } from '@/store/start'
import { SearchPlaceDataType, StartSearchListType, StartState } from '@/types'

const StartSearchList = ({ result, setSearch }: StartSearchListType) => {
  const dataArr = result
  const dispatch = useDispatch()
  const isStartChecked = useSelector(
    (state: StartState) => state.start.isChecked,
  )

  const handleDataClick = (data: SearchPlaceDataType) => {
    setSearch({
      startSearchTerm: '',
      endSearchTerm: '',
      waySearchTerm: '',
    })
    dispatch(startInitiate(data))
    dispatch(startChekcedTrue())
  }

  return (
    <div
      className={`absolute z-50  w-80 rounded-b border border-black border-t-white bg-white ${isStartChecked && 'hidden'}`}
    >
      {dataArr?.map((value: SearchPlaceDataType, index: number) => {
        return (
          <StartSearchListContent
            key={index}
            searchPlaceData={value}
            onDataClick={handleDataClick}
          />
        )
      })}
    </div>
  )
}

export default StartSearchList
