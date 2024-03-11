import ListContent from './listContent'
import { ListType } from '@/types'

const List = (props: ListType) => {
  const { result } = props
  const dataArr = result

  type ValueT = {
    name: string
    category: string
    address: string
  }

  return (
    <div className="absolute z-50 w-80 rounded-b border border-b border-l border-r border-black border-t-white bg-white">
      {dataArr?.map((value: ValueT, index: number) => {
        return (
          <ListContent
            key={index}
            name={value.name}
            category={value.category}
            address={value.address}
          />
        )
      })}
    </div>
  )
}

export default List
