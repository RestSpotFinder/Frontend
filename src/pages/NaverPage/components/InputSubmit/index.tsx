import { SetStateAction, useEffect, useState, Dispatch } from 'react'
import { SearchPlaceDataType } from '@/types'
import InputText from './inputText.tsx'
import './index.css'

interface InputSubmitProps {
  setStartPlace: Dispatch<SetStateAction<SearchPlaceDataType | null>>
  setGoalPlace: Dispatch<SetStateAction<SearchPlaceDataType | null>>
  handleClickSearchRoutes: () => void
  setRestSpotModalOpen: Dispatch<SetStateAction<boolean>>
  setHasStartAndGoal: Dispatch<SetStateAction<boolean>>
  hasStartAndGoal: boolean
  setShowRouteList: Dispatch<SetStateAction<boolean>>
  showRouteList: boolean
}

const InputSubmit = ({
  setStartPlace,
  setGoalPlace,
  handleClickSearchRoutes,
  setRestSpotModalOpen,
  hasStartAndGoal,
  setHasStartAndGoal,
  setShowRouteList,
  showRouteList,
}: InputSubmitProps) => {
  // const [wayPointPlaceholder, setWayPointPlaceholder] = useState('경유지 입력')
  // const [wayPoints, setWayPoints] = useState<string[]>([])
  // const [isMax, setIsMax] = useState(false)

  // const handleDeleteWaypoint = (index: number) => {
  //   const updatedWaypoints = wayPoints.filter((_, i) => i !== index)
  //   setWayPoints(updatedWaypoints)
  //   setIsMax(false)
  // }

  // const handleWaypointChange = (index: number, value: string) => {
  //   const updatedWaypoints = [...wayPoints]
  //   updatedWaypoints[index] = value
  //   setWayPoints(updatedWaypoints)
  // }

  // const handleWaypointClick = () => {
  //   setWayPoints([...wayPoints, ''])
  //   if (wayPoints.length === 4) setIsMax(true)
  // }

  //////
  const [isReset, setIsReset] = useState<boolean>(false)

  const handleClickReset = () => {
    setStartPlace(null)
    setGoalPlace(null)
    setIsReset(true)
    setRestSpotModalOpen(false)
    setHasStartAndGoal(true)
    setShowRouteList(false)
  }

  useEffect(() => {
    isReset && setIsReset(false)
  }, [setIsReset, isReset])

  return (
    <div className="inputSubmit">
    <div className="inputBox">
        <InputText
          setPlace={setStartPlace}
          type={'start'}
          isReset={isReset}
          setHasStartAndGoal={setHasStartAndGoal}
          setShowRouteList={setShowRouteList}
          setRestSpotModalOpen={setRestSpotModalOpen}
          setStartPlace={setStartPlace}
          setGoalPlace={setGoalPlace}
        />

        {/*{wayPoints.map((waypoint, index) => (*/}
        {/*  <div key={index} className="relative">*/}
        {/*    <input*/}
        {/*      type="text"*/}
        {/*      name="waySearchTerm"*/}
        {/*      className="h-10 w-80 border border-l border-r border-black border-b-zinc-100 border-t-zinc-50 p-4 placeholder-gray-400 placeholder-opacity-50"*/}
        {/*      placeholder={wayPointPlaceholder}*/}
        {/*      onFocus={() => setWayPointPlaceholder('경유지를 입력하세요')}*/}
        {/*      value={waypoint}*/}
        {/*      onChange={e => handleWaypointChange(index, e.target.value)}*/}
        {/*    />*/}
        {/*    /!* {waypoint && (*/}
        {/*    <StartSearchList result={result} setSearch={setSearch} />*/}
        {/*  )} *!/*/}
        {/*    <button*/}
        {/*      className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-transparent text-gray-300"*/}
        {/*      onClick={() => handleDeleteWaypoint(index)}*/}
        {/*    >*/}
        {/*      -*/}
        {/*    </button>*/}
        {/*  </div>*/}
        {/*))}*/}

        <InputText
          setPlace={setGoalPlace}
          type={'goal'}
          isReset={isReset}
          setHasStartAndGoal={setHasStartAndGoal}
          setShowRouteList={setShowRouteList}
          setRestSpotModalOpen={setRestSpotModalOpen}
          setStartPlace={setStartPlace}
          setGoalPlace={setGoalPlace}
        />
      </div>

      <div className="btnBox">
        <button onClick={handleClickReset}><p>다시입력</p></button>
        {/*<button*/}
        {/*  className={`hidden items-center gap-2 rounded border border-gray-400 py-1.5 pl-2 pr-3 ${isMax && 'hidden'}`}*/}
        {/*  onClick={handleWaypointClick}*/}
        {/*>*/}
        {/*  <PlusIcon className="h-6 w-6" />*/}
        {/*  <p>경유지</p>*/}
        {/*</button>*/}
        <button onClick={handleClickSearchRoutes}><p>길찾기</p></button>
      </div>

      {!hasStartAndGoal && (
        <div className="errText"><p>출발지와 도착지를 모두 입력하세요!</p></div>
      )}

      {!showRouteList && (
        <div className="recentBox">
          <p>최근 검색한 경로 <span> (아직 기능 구현중입니다.)</span></p>
          <div className="recentList">
            <p> 모란역 8호선 -> 대전역(고속철도) </p>
          </div>
          <p>최근 검색 <span> (아직 기능 구현중입니다.)</span></p>
          <div className="recentList">
            <p> 서귀피안 본점</p>
            <p> 서울삼겹살 모란점</p>
            <p> 오뚜기식당 모란맛집</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default InputSubmit
