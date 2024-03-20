import PathInfoContent from './pathInfoContent'
import React, { useState, useEffect } from 'react'
import { clickMorePathDataActivate } from '@/store/click'
import { useSelector, useDispatch } from 'react-redux'
import { useGetRoutes } from '@/apis/hooks'
import { Loading } from '..'
import { StartState, EndState, ClickState, Route } from '@/types'

const PathInfo = () => {
  const dispatch = useDispatch()
  const startLat = useSelector((state: StartState) => state.start.lat)
  const startLng = useSelector((state: StartState) => state.start.lng)
  const endLat = useSelector((state: EndState) => state.end.lat)
  const endLng = useSelector((state: EndState) => state.end.lng)
  const clickEvent = useSelector((state: ClickState) => state.click.findPath)
  const clickEventMorePath = useSelector(
    (state: ClickState) => state.click.morePathData,
  )

  const [result, setResult] = useState<Route[] | null>(null)

  const start = [startLng, startLat].join(',')
  const goal = [endLng, endLat].join(',')
  const waypoints: string[] | null = []

  const { data: firstRoutes, isLoading: firstRoutesLoading } = useGetRoutes({
    start,
    goal,
    waypoints,
    page: '1',
  })

  useEffect(() => {
    if (firstRoutes && clickEvent) {
      setResult(firstRoutes)
    }
  }, [firstRoutes, clickEvent])

  const { data: secondRoutes, isLoading: secondRoutesLoading } = useGetRoutes({
    start,
    goal,
    waypoints,
    page: '2',
  })

  useEffect(() => {
    if (secondRoutes && clickEventMorePath) {
      setResult(prevResult => {
        return [...(prevResult as Route[]), ...secondRoutes]
      })
    }
  }, [secondRoutes, clickEventMorePath])

  if (firstRoutesLoading && secondRoutesLoading) {
    return <Loading />
  }

  const morePathDataButton = () => {
    dispatch(clickMorePathDataActivate())
  }

  return (
    <div className={`${clickEvent ? '' : 'hidden'} `}>
      <div className="w-96 bg-white">
        <h1 className="sticky ml-11 font-bold text-red-600">
          더블 클릭시 경로상 휴게소 정보가 표시됩니다.
        </h1>
      </div>
      <div className="mb-5 max-h-[calc(100vh-20rem)] overflow-y-auto ">
        {result?.map((value, index) => {
          return (
            <React.Fragment key={index}>
              <PathInfoContent
                key={value.routeId}
                ranking={index}
                duration={value.duration}
                distance={value.distance}
                tollFare={value.tollFare}
                fuelPrice={value.fuelPrice}
                optionText={value.optionText}
                routeId={value.routeId}
              />
              {index !== result.length - 1 && <hr />}
            </React.Fragment>
          )
        })}
        <button
          className={`relative ml-8 mt-5 h-10 w-80 rounded-md bg-green-600 ${clickEventMorePath && 'hidden'}`}
          onClick={morePathDataButton}
        >
          <h1 className="text-white">더보기</h1>
        </button>
      </div>
    </div>
  )
}

export default PathInfo
