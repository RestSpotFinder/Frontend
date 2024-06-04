import { SetStateAction, useEffect, useState, Dispatch } from 'react'
import { Route, SearchPlaceDataType } from '@/types'
import InputText from './inputText.tsx'
import './index.css'
import postSurvey from '@/apis/hooks/postSurvey.ts'

interface InputSubmitProps {
  setStartPlace: Dispatch<SetStateAction<SearchPlaceDataType | null>>
  setGoalPlace: Dispatch<SetStateAction<SearchPlaceDataType | null>>
  setRouteList: Dispatch<SetStateAction<Route[] | undefined>>
  handleClickSearchRoutes: () => void
  setRestSpotModalOpen: Dispatch<SetStateAction<boolean>>
  setHasStartAndGoal: Dispatch<SetStateAction<boolean>>
  hasStartAndGoal: boolean
  setShowRouteList: Dispatch<SetStateAction<boolean>>
  showRouteList: boolean
  setRouteHistory: Dispatch<SetStateAction<string[]>>
  routeHistory: string[]
  clearRouteHistory: () => void
}

const InputSubmit = ({
  setStartPlace,
  setGoalPlace,
  setRouteList,
  handleClickSearchRoutes,
  setRestSpotModalOpen,
  hasStartAndGoal,
  setHasStartAndGoal,
  setShowRouteList,
  showRouteList,
  setRouteHistory,
  routeHistory,
  clearRouteHistory,
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
  useEffect(() => {
    isReset && setIsReset(false)
  }, [setIsReset, isReset])

  const handleClickReset = () => {
    setStartPlace(null)
    setGoalPlace(null)
    setIsReset(true)
    setRestSpotModalOpen(false)
    setHasStartAndGoal(true)
    setShowRouteList(false)
    setRouteList([])
  }

  const [placeHistory, setPlaceHistory] = useState<string[]>([])

  useEffect(() => {
    const storedPlaceHistory = JSON.parse(
      localStorage.getItem('placeHistory') || '[]',
    )
    const storedRouteHistory = JSON.parse(
      localStorage.getItem('routeHistory') || '[]',
    )

    setPlaceHistory(storedPlaceHistory)
    setRouteHistory(storedRouteHistory)
  }, [])

  const addPlaceHistory = (place: string) => {
    const storedData = localStorage.getItem('placeHistory')
    const history: string[] = storedData ? JSON.parse(storedData) : []

    if (history.length >= 5) {
      history.shift()
    }
    history.push(place)
    localStorage.setItem('placeHistory', JSON.stringify(history))
    setPlaceHistory(history)
  }

  const clearPlaceHistory = () => {
    localStorage.removeItem('placeHistory')
    setPlaceHistory([])
  }

  const [email, setEmail] = useState<string>('')
  const [text, setText] = useState<string>('')

  const clickSurveyBtn = async () => {
    if (text.length != 0) {
      try {
        window.alert('의견 보내주셔서 감사합니다.')
        await postSurvey({ email, text })
      } catch (error) {
        window.alert('의견 제출에 실패했습니다. 다시 시도해주세요.')
      }
    } else {
      window.alert('의견을 작성해주세요.')
    }
  }

  return (
    <div className="inputSubmit" style={showRouteList ? {} : { height: 'inherit' }}>
      {showRouteList && (
        <div className="slideBtn" onClick={() => handleClickReset()} />
      )}
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
          addPlaceHistory={addPlaceHistory}
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
          addPlaceHistory={addPlaceHistory}
        />
      </div>

      <div className="btnBox">
        <button onClick={handleClickReset}>
          <p>다시입력</p>
        </button>
        {/*<button*/}
        {/*  className={`hidden items-center gap-2 rounded border border-gray-400 py-1.5 pl-2 pr-3 ${isMax && 'hidden'}`}*/}
        {/*  onClick={handleWaypointClick}*/}
        {/*>*/}
        {/*  <PlusIcon className="h-6 w-6" />*/}
        {/*  <p>경유지</p>*/}
        {/*</button>*/}
        <button onClick={handleClickSearchRoutes}>
          <p>길찾기</p>
        </button>
      </div>

      {!hasStartAndGoal && (
        <div className="errText">
          <p>출발지와 도착지를 모두 입력하세요!</p>
        </div>
      )}

      {!showRouteList && (
        <div>
          <div className="recentTitle">
            <p>최근 검색한 장소</p>
            <span onClick={clearPlaceHistory}>검색 기록 삭제</span>
          </div>
          <div className="recentList place">
            {placeHistory.length > 0 ? (
              placeHistory.map(search => <p>{search}</p>)
            ) : (
              <span>검색 기록이 없습니다.</span>
            )}
          </div>

          <div className="recentTitle">
            <p>최근 검색한 경로</p>
            <span onClick={clearRouteHistory}>검색 기록 삭제</span>
          </div>
          <div className="recentList route">
            {routeHistory.length > 0 ? (
              routeHistory.map(search => <p>{search}</p>)
            ) : (
              <span>검색 기록이 없습니다.</span>
            )}
          </div>
          <div className="surveyBox">
            <input
              type="email"
              placeholder="Email (선택)"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <textarea
              placeholder="서비스를 사용하면서 불편한 점이나 개선 사항을 보내주세요. 이메일을 작성해주시면 수정 여부 및 적용 일자를 공유해드립니다."
              value={text}
              onChange={e => setText(e.target.value)}
            ></textarea>
            <button onClick={clickSurveyBtn}>보내기</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default InputSubmit
