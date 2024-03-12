import SearchListContent from './startSearchListContent'
import { useDispatch, useSelector } from 'react-redux'
import { startInitiate } from '@/store/start'
import { startChekcedTrue } from '@/store/start'
import { DataType } from '@/types'

const StartSearchList = (props: any) => {
  const { result, setSearch } = props
  const dataArr = result
  const dispatch = useDispatch()
  const isStartChecked = useSelector((state: any) => state.start.isChecked)

  const handleDataClick = (data: DataType) => {
    setSearch({
      startSearchTerm: '',
      endSearchTerm: '',
      waySearchTerm: '',
    })
    dispatch(startInitiate(data))
    dispatch(startChekcedTrue())
  }

  type ValueT = {
    name: string
    category: string
    address: string
    lat: string
    lng: string
  }

  return (
    <div
      className={`absolute z-50  w-80 rounded-b border border-black border-t-white bg-white ${isStartChecked ? 'hidden' : ''}`}
    >
      {dataArr?.map((value: ValueT, index: number) => {
        return (
          <SearchListContent
            key={index}
            name={value.name}
            category={value.category}
            address={value.address}
            lat={value.lat}
            lng={value.lng}
            onDataClick={handleDataClick}
          />
        )
      })}
    </div>
  )
}

export default StartSearchList
