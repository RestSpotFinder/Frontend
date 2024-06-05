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

  // const [email, setEmail] = useState<string>('')
  // const [text, setText] = useState<string>('')
  //
  // const clickSurveyBtn = async () => {
  //   if (text.length != 0) {
  //     try {
  //       window.alert('의견 보내주셔서 감사합니다.')
  //       await postSurvey({ email, text })
  //     } catch (error) {
  //       window.alert('의견 제출에 실패했습니다. 다시 시도해주세요.')
  //     }
  //   } else {
  //     window.alert('의견을 작성해주세요.')
  //   }
  // }

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

      {/*  {!showRouteList && (*/}
      {/*      <div className="surveyBox">*/}
      {/*        <input*/}
      {/*          type="email"*/}
      {/*          placeholder="Email (선택)"*/}
      {/*          value={email}*/}
      {/*          onChange={e => setEmail(e.target.value)}*/}
      {/*        />*/}
      {/*        <textarea*/}
      {/*          placeholder="서비스를 사용하면서 불편한 점이나 개선 사항을 보내주세요. 이메일을 작성해주시면 수정 여부 및 적용 일자를 공유해드립니다."*/}
      {/*          value={text}*/}
      {/*          onChange={e => setText(e.target.value)}*/}
      {/*        ></textarea>*/}
      {/*        <button onClick={clickSurveyBtn}>보내기</button>*/}
      {/*      </div>*/}

      {/*    </div>*/}
      {/*  )}*/}
    </div>
  )
}

export default InputSubmit
