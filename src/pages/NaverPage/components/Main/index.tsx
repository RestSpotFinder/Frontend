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
  const [clickedFindRoute, setClickedFindRoute] = useState<boolean>(false)
  const [routeHistory, setRouteHistory] = useState<string[]>([])

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
      setHasStartAndGoal(true)
      setClickedFindRoute(true)
      addRouteHistory()
    } else {
      setHasStartAndGoal(false)
    }
  }

  const addRouteHistory = () => {
    const storedData = localStorage.getItem('routeHistory')
    const history: string[] = storedData ? JSON.parse(storedData) : []

    if (history.length >= 5) history.shift()

    history.push(startPlace?.name + ' -> ' + goalPlace?.name)
    localStorage.setItem('routeHistory', JSON.stringify(history))
    setRouteHistory(history)
  }

  const clearRouteHistory = () => {
    localStorage.removeItem('routeHistory')
    setRouteHistory([])
  }

  useEffect(() => {
    selectedRoute && restSpotsRefetch()
  }, [selectedRoute, restSpotsRefetch])

  return (
    <div className="main">
      <div className="nav">
        <div className="slideBtn"></div>
        <Title />
        <InputSubmit
          setStartPlace={setStartPlace}
          setGoalPlace={setGoalPlace}
          setRouteList={setRouteList}
          handleClickSearchRoutes={handleClickSearchRoutes}
          setRestSpotModalOpen={setRestSpotModalOpen}
          hasStartAndGoal={hasStartAndGoal}
          setHasStartAndGoal={setHasStartAndGoal}
          setShowRouteList={setShowRouteList}
          showRouteList={showRouteList}
          setRouteHistory={setRouteHistory}
          routeHistory={routeHistory}
          clearRouteHistory={clearRouteHistory}
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
              <RecentSearch />
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
          clickedFindRoute={clickedFindRoute}
          setClickedFindRoute={setClickedFindRoute}
        />
      </div>
    </div>
  )
}

export default Main
