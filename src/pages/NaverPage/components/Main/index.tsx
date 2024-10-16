import { NaverMap } from '@/components'
import {
  InputSubmit,
  Title,
  PathInfo,
  RecentSearch,
  RestAreaInfo,
  Loading,
} from '../'
import { useState, useEffect } from 'react'
import { Place, Route, RouteHistory } from '@/types'
import { useGetRoutes, useGetRestSpots } from '@/apis/hooks'
import './index.css'
import useGetRoutesBySearchId from '@/apis/hooks/useGetRoutesBySearchId.ts'
import classNames from 'classnames'
import Notice from '../Notice'

const Main = () => {
  const [startPlace, setStartPlace] = useState<Place | null>(null)
  const [goalPlace, setGoalPlace] = useState<Place | null>(null)
  const [routeList, setRouteList] = useState<Route[]>()
  const [selectedRoute, setSelectedRoute] = useState<Route>()
  const [selectedRouteHistory, setSelectedRouteHistory] = useState<
    RouteHistory | undefined
  >()
  const [clickedRouteIndex, setClickedRouteIndex] = useState<number>(0)
  const [clickedMorePath, setClickedMorePath] = useState<boolean>(false)
  const [hasStartAndGoal, setHasStartAndGoal] = useState<boolean>(true)
  const [restSpotModalOpen, setRestSpotModalOpen] = useState<boolean>(false)
  const [showRouteList, setShowRouteList] = useState<boolean>(false)
  const [hoveredRestSpot, setHoveredRestSpot] = useState<string>('')
  const [clickedRestSpot, setClickedRestSpot] = useState<string>('')
  const [routeHistory, setRouteHistory] = useState<RouteHistory[]>([])
  const [placeHistory, setPlaceHistory] = useState<Place[]>([])
  const [clickedPlaceHistory, setClickedPlaceHistory] = useState<boolean>(false)
  const [isMenuActive, setIsMenuActive] = useState(true)

  const { refetch: routesRefetch, isLoading: isGetRoutesLoading } =
    useGetRoutes({
      start: [startPlace?.lng, startPlace?.lat].join(','),
      goal: [goalPlace?.lng, goalPlace?.lat].join(','),
      startName: startPlace?.name,
      goalName: goalPlace?.name,
      // waypoints: waypoints.map(waypoint =>
      //   [waypoint.lng, waypoint.lat].join(','),
      // ),
      page: '1',
    })
  const { data: restSpotList, refetch: restSpotsRefetch } = useGetRestSpots({
    routeId: selectedRoute?.routeId,
  })

  const { refetch: routesBySearchIdRefetch } = useGetRoutesBySearchId({
    searchId: selectedRouteHistory?.searchId,
  })

  const handleClickSearchRoutes = async () => {
    if (startPlace && goalPlace) {
      const routes = await routesRefetch()

      setShowRouteList(true)
      setClickedMorePath(false)
      setRouteList(routes.data)
      routes.data && setSelectedRoute(routes.data[0])

      const name = startPlace?.name + ' -> ' + goalPlace?.name
      const searchId = routes.data ? routes.data[0].searchId : 0
      addRouteHistory({ name, searchId, startPlace, goalPlace })
      setHasStartAndGoal(true) // errText
      setClickedPlaceHistory(false) // 최근 검색 장소 클릭 초기화
      setClickedRestSpot('') // 휴게소 클릭 초기화
    } else {
      setHasStartAndGoal(false)
    }
  }

  const handleClickRecentSearch = async () => {
    if (selectedRouteHistory != null && selectedRouteHistory.searchId > 0) {
      const routes = await routesBySearchIdRefetch()

      setShowRouteList(true)
      setClickedMorePath(false)
      setRouteList(routes.data)
      routes.data && setSelectedRoute(routes.data[0])
      setStartPlace(selectedRouteHistory.startPlace)
      setGoalPlace(selectedRouteHistory.goalPlace)
    }
  }

  const addRouteHistory = (routeHistoryItem: RouteHistory) => {
    const history: RouteHistory[] = JSON.parse(
      localStorage.getItem('route') || '[]',
    )
    if (history.length >= 5) history.shift()

    history.push(routeHistoryItem)
    localStorage.setItem('route', JSON.stringify(history))
    setRouteHistory(history)
  }

  const addPlaceHistory = (place: Place) => {
    const history: Place[] = JSON.parse(localStorage.getItem('place') || '[]')
    if (history.length >= 5) history.shift()

    history.push(place)
    localStorage.setItem('place', JSON.stringify(history))
    setPlaceHistory(history)
  }

  const clearHistory = (type: string) => {
    if (type) {
      localStorage.removeItem(type)
      if (type === 'route') setRouteHistory([])
      if (type === 'place') setPlaceHistory([])
    }
  }

  const handleClickSlideButton = () => {
    setIsMenuActive(!isMenuActive)
  }

  useEffect(() => {
    selectedRoute && restSpotsRefetch()
  }, [selectedRoute, restSpotsRefetch])

  useEffect(() => {
    setPlaceHistory(JSON.parse(localStorage.getItem('place') || '[]'))
    setRouteHistory(JSON.parse(localStorage.getItem('route') || '[]'))
  }, [])

  // 최근 검색한 경로 클릭 이벤트 처리
  useEffect(() => {
    handleClickRecentSearch()
  }, [selectedRouteHistory])

  // 최근 검색한 장소 클릭 이벤트 처리
  useEffect(() => {
    if (startPlace && goalPlace && clickedPlaceHistory) {
      handleClickSearchRoutes()
    }
  }, [startPlace, goalPlace, clickedPlaceHistory])

  return (
    <div className="main">
      <div className={classNames('navContainer', isMenuActive && 'active')}>
        <div className={classNames('nav', isMenuActive && 'active')}>
          <Title />
          <InputSubmit
            startPlace={startPlace}
            setStartPlace={setStartPlace}
            goalPlace={goalPlace}
            setGoalPlace={setGoalPlace}
            setRouteList={setRouteList}
            handleClickSearchRoutes={handleClickSearchRoutes}
            setRestSpotModalOpen={setRestSpotModalOpen}
            hasStartAndGoal={hasStartAndGoal}
            setShowRouteList={setShowRouteList}
            showRouteList={showRouteList}
            addPlaceHistory={addPlaceHistory}
          />
          <Notice />
          
          {isGetRoutesLoading ? (
            <Loading />
          ) : (
            <>
              {routeList && showRouteList ? (
                <PathInfo
                  routeList={routeList}
                  setRouteList={setRouteList}
                  selectedRoute={selectedRoute}
                  setSelectedRoute={setSelectedRoute}
                  clickedRouteIndex={clickedRouteIndex}
                  setClickedRouteIndex={setClickedRouteIndex}
                  startPlace={startPlace}
                  goalPlace={goalPlace}
                  clickedMorePath={clickedMorePath}
                  setClickedMorePath={setClickedMorePath}
                  setRestSpotModalOpen={setRestSpotModalOpen}
                  setClickedRestSpot={setClickedRestSpot}
                />
              ) : (
                <div>
                  <RecentSearch
                    startPlace={startPlace}
                    goalPlace={goalPlace}
                    setStartPlace={setStartPlace}
                    setGoalPlace={setGoalPlace}
                    routeHistory={routeHistory}
                    placeHistory={placeHistory}
                    clearHistory={clearHistory}
                    setSelectedRouteHistory={setSelectedRouteHistory}
                    handleClickRecentSearch={handleClickRecentSearch}
                    setClickedPlaceHistory={setClickedPlaceHistory}
                  />
                  {/* <Survey /> */}
                </div>
              )}
            </>
          )}
        </div>
        {selectedRoute && restSpotModalOpen && (
          <div className="nav">
            <RestAreaInfo
              isActive={isMenuActive}
              route={selectedRoute}
              restSpotModalOpen={restSpotModalOpen}
              setRestSpotModalOpen={setRestSpotModalOpen}
              hoveredRestSpot={hoveredRestSpot}
              setHoveredRestSpot={setHoveredRestSpot}
              clickedRestSpot={clickedRestSpot}
              setClickedRestSpot={setClickedRestSpot}
              clickedRouteIndex={clickedRouteIndex}
            />
          </div>
        )}
        <div className="slideBtnContainer">
          <div
            className={classNames('slideBtn', isMenuActive && 'active')}
            onClick={handleClickSlideButton}
          >
          </div>
        </div>
      </div>

      <div className="map">
        <NaverMap
          start={startPlace}
          goal={goalPlace}
          routeList={routeList}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          restSpotList={restSpotList}
          restSpotModalOpen={restSpotModalOpen}
          setHoveredRestSpot={setHoveredRestSpot}
          setClickedRestSpot={setClickedRestSpot}
          clickedRestSpot={clickedRestSpot}
        />
      </div>
    </div>
  )
}

export default Main
