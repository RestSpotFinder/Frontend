import EndSearchListContent from './endSearchListContent'
import { useDispatch, useSelector } from 'react-redux'
import { endInitiate } from '@/store/end'
import { endCheckedTrue } from '@/store/end'
import { DataType } from '@/types'

const EndSearchList = (props: any) => {
  const { result, setSearch } = props
  const dataArr = result
  const dispatch = useDispatch()
  const isEndChecked = useSelector((state: any) => state.end.isChecked)

  const handleDataClick = (data: DataType) => {
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
    onDataClick: (data: DataType) => void
  }

  return (
    <div
      className={`absolute z-50  w-80 rounded-b border border-b border-l border-r border-black border-t-white bg-white ${isEndChecked ? 'hidden' : ''}`}
    >
      {dataArr?.map((value: ValueT, index: number) => {
        return (
          <EndSearchListContent
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

export default EndSearchList
