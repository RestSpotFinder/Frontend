import { SetStateAction, useEffect, useState, Dispatch } from 'react'
import { Route, SearchPlaceDataType } from '@/types'
import InputText from './inputText.tsx'
import './index.css'

interface InputSubmitProps {
  startPlace: SearchPlaceDataType | null
  setStartPlace: Dispatch<SetStateAction<SearchPlaceDataType | null>>
  goalPlace: SearchPlaceDataType | null
  setGoalPlace: Dispatch<SetStateAction<SearchPlaceDataType | null>>
  setRouteList: Dispatch<SetStateAction<Route[] | undefined>>
  handleClickSearchRoutes: () => void
  setRestSpotModalOpen: Dispatch<SetStateAction<boolean>>
  setHasStartAndGoal: Dispatch<SetStateAction<boolean>>
  hasStartAndGoal: boolean
  setShowRouteList: Dispatch<SetStateAction<boolean>>
  showRouteList: boolean
  addPlaceHistory: (place: string) => void
}

const InputSubmit = ({
  startPlace,
  setStartPlace,
  goalPlace,
  setGoalPlace,
  setRouteList,
  handleClickSearchRoutes,
  setRestSpotModalOpen,
  hasStartAndGoal,
  setHasStartAndGoal,
  setShowRouteList,
  showRouteList,
  addPlaceHistory,
}: InputSubmitProps) => {
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

  return (
    <div className="inputSubmit">
      {showRouteList && (
        <div className="slideBtn" onClick={() => handleClickReset()} />
      )}
      <div className="inputBox">
        <InputText
          place={startPlace}
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

        <InputText
          place={goalPlace}
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
        <button onClick={handleClickSearchRoutes}>
          <p>길찾기</p>
        </button>
      </div>

      {!hasStartAndGoal && (
        <div className="errText">
          <p>출발지와 도착지를 모두 입력하세요!</p>
        </div>
      )}
    </div>
  )
}

export default InputSubmit
