import { SetStateAction, useEffect, useState, Dispatch } from 'react'
import { RestartIcon, PlusIcon, RightIcon } from '@/assets/Icons'
import { SearchPlaceDataType } from '@/types'
import Input from './input'

interface InputSubmitProps {
  setStartPlace: Dispatch<SetStateAction<SearchPlaceDataType | null>>
  setGoalPlace: Dispatch<SetStateAction<SearchPlaceDataType | null>>
  handleClickSearchRoutes: () => void
  setRestSpotModalOpen: Dispatch<SetStateAction<boolean>>
  setHasStartAndGoal: Dispatch<SetStateAction<boolean>>
  hasStartAndGoal: boolean
  setRouteListModalOpen: Dispatch<SetStateAction<boolean>>
}

const InputSubmit = ({
  setStartPlace,
  setGoalPlace,
  handleClickSearchRoutes,
  setRestSpotModalOpen,
  hasStartAndGoal,
  setHasStartAndGoal,
  setRouteListModalOpen,
}: InputSubmitProps) => {
  const [wayPointPlaceholder, setWayPointPlaceholder] = useState('경유지 입력')
  const [wayPoints, setWayPoints] = useState<string[]>([])
  const [isMax, setIsMax] = useState(false)

  const handleDeleteWaypoint = (index: number) => {
    const updatedWaypoints = wayPoints.filter((_, i) => i !== index)
    setWayPoints(updatedWaypoints)
    setIsMax(false)
  }

  const handleWaypointChange = (index: number, value: string) => {
    const updatedWaypoints = [...wayPoints]
    updatedWaypoints[index] = value
    setWayPoints(updatedWaypoints)
  }

  const handleWaypointClick = () => {
    setWayPoints([...wayPoints, ''])
    if (wayPoints.length === 4) setIsMax(true)
  }

  //////
  const [isReset, setIsReset] = useState<boolean>(false)

  const handleClickReset = () => {
    setStartPlace(null)
    setGoalPlace(null)
    setIsReset(true)
    setRestSpotModalOpen(false)
    setHasStartAndGoal(true)
    setRouteListModalOpen(false)
  }

  useEffect(() => {
    isReset && setIsReset(false)
  }, [setIsReset, isReset])

  return (
    <div className={`relative flex w-96 flex-col gap-3 bg-white px-8 py-6`}>
      <div className="flex w-full flex-col">
        <Input
          setPlace={setStartPlace}
          type={'start'}
          isReset={isReset}
          setHasStartAndGoal={setHasStartAndGoal}
          setRouteListModalOpen={setRouteListModalOpen}
          setRestSpotModalOpen={setRestSpotModalOpen}
          setStartPlace={setStartPlace}
          setGoalPlace={setGoalPlace}
        />

        {wayPoints.map((waypoint, index) => (
          <div key={index} className="relative">
            <input
              type="text"
              name="waySearchTerm"
              className="h-10 w-80 border border-l border-r border-black border-b-zinc-100 border-t-zinc-50 p-4 placeholder-gray-400 placeholder-opacity-50"
              placeholder={wayPointPlaceholder}
              onFocus={() => setWayPointPlaceholder('경유지를 입력하세요')}
              value={waypoint}
              onChange={e => handleWaypointChange(index, e.target.value)}
            />
            {/* {waypoint && (
            <StartSearchList result={result} setSearch={setSearch} />
          )} */}
            <button
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-transparent text-gray-300"
              onClick={() => handleDeleteWaypoint(index)}
            >
              -
            </button>
          </div>
        ))}

        <Input
          setPlace={setGoalPlace}
          type={'goal'}
          isReset={isReset}
          setHasStartAndGoal={setHasStartAndGoal}
          setRouteListModalOpen={setRouteListModalOpen}
          setRestSpotModalOpen={setRestSpotModalOpen}
          setStartPlace={setStartPlace}
          setGoalPlace={setGoalPlace}
        />
      </div>

      <div className="flex w-full justify-between bg-white">
        <button
          className="flex items-center gap-2 rounded border border-gray-400 py-1.5 pl-2 pr-3 hover:bg-gray-300 hover:bg-opacity-30"
          onClick={handleClickReset}
        >
          <RestartIcon className="h-6 w-6" />
          <p>다시 입력</p>
        </button>
        <button
          className={`hidden items-center gap-2 rounded border border-gray-400 py-1.5 pl-2 pr-3 ${isMax && 'hidden'}`}
          onClick={handleWaypointClick}
        >
          <PlusIcon className="h-6 w-6" />
          <p>경유지</p>
        </button>
        <button
          className="flex items-center gap-2 rounded border border-gray-400 bg-green-600 py-1.5 pl-3 pr-1 text-white"
          onClick={handleClickSearchRoutes}
        >
          <p>길찾기</p>
          <RightIcon className="h-6 w-6" />
        </button>
      </div>
      {!hasStartAndGoal && (
        <div className=" flex justify-center  ">
          <h1 className="mt-3 font-bold text-red-600">
            출발지와 도착지를 모두 입력하세요!
          </h1>
        </div>
      )}
    </div>
  )
}

export default InputSubmit
