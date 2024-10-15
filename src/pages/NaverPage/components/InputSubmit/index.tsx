import { SetStateAction, useEffect, useState, Dispatch } from 'react'
import { Route, Place } from '@/types'
import InputText from './inputText.tsx'
import { debounce } from 'lodash'
import './index.css'

interface InputSubmitProps {
  startPlace: Place | null
  setStartPlace: Dispatch<SetStateAction<Place | null>>
  goalPlace: Place | null
  setGoalPlace: Dispatch<SetStateAction<Place | null>>
  setRouteList: Dispatch<SetStateAction<Route[] | undefined>>
  handleClickSearchRoutes: () => void
  setRestSpotModalOpen: Dispatch<SetStateAction<boolean>>
  hasStartAndGoal: boolean
  setShowRouteList: Dispatch<SetStateAction<boolean>>
  showRouteList: boolean
  addPlaceHistory: (place: Place) => void
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
  setShowRouteList,
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
    setShowRouteList(false)
    setRouteList([])
  }

  return (
    <div className="inputSubmit">
      {/* {showRouteList && (
        <div className="slideBtn" onClick={() => handleClickReset()} />
      )} */}
      <div className="inputBox">
        <InputText
          place={startPlace}
          setPlace={setStartPlace}
          type={'start'}
          isReset={isReset}
          setShowRouteList={setShowRouteList}
          setRestSpotModalOpen={setRestSpotModalOpen}
          addPlaceHistory={addPlaceHistory}
        />

        <InputText
          place={goalPlace}
          setPlace={setGoalPlace}
          type={'goal'}
          isReset={isReset}
          setShowRouteList={setShowRouteList}
          setRestSpotModalOpen={setRestSpotModalOpen}
          addPlaceHistory={addPlaceHistory}
        />
      </div>

      <div className="btnBox">
        <button onClick={handleClickReset}>
          <p>다시입력</p>
        </button>
        <button onClick={debounce(handleClickSearchRoutes, 500)}>
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
