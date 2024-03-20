import { NaverMap } from '@/components'
import { InputSubmit, Title, PathInfo } from '../'
import { useState } from 'react'
import { SearchPlaceDataType } from '@/types'

const Main = () => {
  const [startPlace, setStartPlace] = useState<SearchPlaceDataType | null>(null)
  const [goalPlace, setGoalPlace] = useState<SearchPlaceDataType | null>(null)

  console.log(startPlace, goalPlace)

  return (
    <div className="flex w-full">
      <div className="flex flex-col">
        <Title />
        <InputSubmit
          setStartPlace={setStartPlace}
          setGoalPlace={setGoalPlace}
        />
        <PathInfo />
      </div>
      <NaverMap start={startPlace} goal={goalPlace} />
    </div>
  )
}

export default Main
