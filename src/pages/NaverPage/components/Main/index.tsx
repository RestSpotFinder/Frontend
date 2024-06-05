import { NaverMap } from '@/components'
import {
  InputSubmit,
  Title,
  PathInfo,
  RecentSearch,
  RestAreaInfo,
  Loading,
  Survey,
} from '../'
import { useState, useEffect } from 'react'
import { SearchPlaceDataType, Route } from '@/types'
import { useGetRoutes, useGetRestSpots } from '@/apis/hooks'
import './index.css'

const Main = () => {
  const [startPlace, setStartPlace] = useState<SearchPlaceDataType | null>(null)
  const [goalPlace, setGoalPlace] = useState<SearchPlaceDataType | null>(null)
  const [routeList, setRouteList] = useState<Route[]>()
  const [selectedRoute, setSelectedRoute] = useState<Route>()
  const [clickedRouteIndex, setClickedRouteIndex] = useState<number>(0)
  const [clickedMorePath, setClickedMorePath] = useState<boolean>(false)
  const [hasStartAndGoal, setHasStartAndGoal] = useState<boolean>(true)
  const [restSpotModalOpen, setRestSpotModalOpen] = useState<boolean>(false)
  const [showRouteList, setShowRouteList] = useState<boolean>(false)
  const [hoveredRestSpot, setHoveredRestSpot] = useState<string>('')
  const [routeHistory, setRouteHistory] = useState<string[]>([])
  const [placeHistory, setPlaceHistory] = useState<string[]>([])

  const { refetch: routesRefetch, isLoading: isGetRoutesLoading } =
    useGetRoutes({
      start: [startPlace?.lng, startPlace?.lat].join(','),
      goal: [goalPlace?.lng, goalPlace?.lat].join(','),
      // waypoints: waypoints.map(waypoint =>
      //   [waypoint.lng, waypoint.lat].join(','),
      // ),
      page: '1',
      isTest: true,
    })
  const { data: restSpotList, refetch: restSpotsRefetch } = useGetRestSpots({
    routeId: selectedRoute?.routeId,
  })

  const handleClickSearchRoutes = async () => {
    if (startPlace && goalPlace) {
      const routes = await routesRefetch()

      setShowRouteList(true)
      setClickedMorePath(false)
      setRouteList(routes.data)
      routes.data && setSelectedRoute(routes.data[0])
      addHistory('route', startPlace?.name + ' -> ' + goalPlace?.name)
      setHasStartAndGoal(true) // errText
    } else {
      setHasStartAndGoal(false)
    }
  }

  const addHistory = (type: string, data: string) => {
    const history: string[] = JSON.parse(localStorage.getItem(type) || '[]')
    if (history.length >= 5) history.shift()

    history.push(data)
    localStorage.setItem(type, JSON.stringify(history))
    if (type === 'route') setRouteHistory(history)
    if (type === 'place') setPlaceHistory(history)
  }

  const clearHistory = (type: string) => {
    if (type) {
      localStorage.removeItem(type)
      if (type === 'route') setRouteHistory([])
      if (type === 'place') setPlaceHistory([])
    }
  }

  useEffect(() => {
    selectedRoute && restSpotsRefetch()
  }, [selectedRoute, restSpotsRefetch])

  useEffect(() => {
    setPlaceHistory(JSON.parse(localStorage.getItem('place') || '[]'))
    setRouteHistory(JSON.parse(localStorage.getItem('route') || '[]'))
  }, [])

  return (
    <div className="main">
      <div className="nav">
        <div className="slideBtn"></div>
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
          addHistory={addHistory}
        />
        {isGetRoutesLoading ? (
          <Loading className="h-full" />
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
              />
            ) : (
              <div>
                <RecentSearch
                  routeHistory={routeHistory}
                  placeHistory={placeHistory}
                  clearHistory={clearHistory}
                />
                <Survey />
              </div>
            )}
          </>
        )}
      </div>
      {selectedRoute && restSpotModalOpen && (
        <div className="nav">
          <RestAreaInfo
            route={selectedRoute}
            setRestSpotModalOpen={setRestSpotModalOpen}
            hoveredRestSpot={hoveredRestSpot}
            clickedRouteIndex={clickedRouteIndex}
          />
        </div>
      )}
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
        />
      </div>
    </div>
  )
}

export default Main
