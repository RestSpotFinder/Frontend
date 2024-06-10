import PathInfoContent from './pathInfoContent'
import { Dispatch, SetStateAction } from 'react'
import { useGetRoutes } from '@/apis/hooks'
import { Route, Place } from '@/types'
import { Loading } from '../'
import './index.css'

interface PathInfoProps {
  routeList: Route[]
  setRouteList: Dispatch<SetStateAction<Route[] | undefined>>
  selectedRoute: Route | undefined
  setSelectedRoute: Dispatch<SetStateAction<Route | undefined>>
  clickedRouteIndex: number
  setClickedRouteIndex: Dispatch<SetStateAction<number>>
  startPlace: Place | null
  goalPlace: Place | null
  clickedMorePath: boolean
  setClickedMorePath: Dispatch<SetStateAction<boolean>>
  setRestSpotModalOpen: Dispatch<SetStateAction<boolean>>
}

const PathInfo = ({
  routeList,
  setRouteList,
  setSelectedRoute,
  clickedRouteIndex,
  setClickedRouteIndex,
  startPlace,
  goalPlace,
  clickedMorePath,
  setClickedMorePath,
  setRestSpotModalOpen,
}: PathInfoProps) => {
  const { refetch: routesRefetch, isLoading: isGetRoutesLoading } =
    useGetRoutes({
      start: [startPlace?.lng, startPlace?.lat].join(','),
      goal: [goalPlace?.lng, goalPlace?.lat].join(','),
      page: '2',
      isTest: true,
    })

  const handleClickMorePathData = () => {
    routesRefetch().then(
      routes => routes.data && setRouteList([...routeList, ...routes.data]),
    )
    setClickedMorePath(true)
  }

  const handleClick = (route: Route, index: number) => {
    setClickedRouteIndex(index)
    setSelectedRoute(route)
  }

  return (
    <div className={`pathInfo`}>
      <p className="noticeText">
        <span>더블 클릭시</span> 경로상 휴게소 정보가 표시됩니다.
      </p>
      <div className="routeBox">
        {routeList?.map((route, index) => {
          return (
            <div
              key={route.routeId}
              onClick={() => handleClick(route, index + 1)}
              onDoubleClick={() => setRestSpotModalOpen(true)}>
              <PathInfoContent ranking={index + 1} route={route} clickedId={clickedRouteIndex} />
              <hr />
            </div>
          )
        })}

        {isGetRoutesLoading && clickedMorePath ? (
          <Loading className="bottom" />
        ) : (
          <div className={`moreBtn  ${clickedMorePath && 'hidden'}`} onClick={handleClickMorePathData}>더보기</div>
        )}
      </div>
      <p className="searchInfo">{startPlace?.name} {`->`} {goalPlace?.name}</p>
    </div>
  )
}

export default PathInfo
