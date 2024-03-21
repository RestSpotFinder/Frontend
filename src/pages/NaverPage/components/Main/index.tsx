import { NaverMap } from '@/components'
import { InputSubmit, Title, PathInfo, RecentSearch } from '../'
import { useState, useEffect } from 'react'
import { SearchPlaceDataType, Route } from '@/types'
import { useGetRoutes, useGetRestSpots } from '@/apis/hooks'

const Main = () => {
  const [startPlace, setStartPlace] = useState<SearchPlaceDataType | null>(null)
  const [goalPlace, setGoalPlace] = useState<SearchPlaceDataType | null>(null)
  const [routeList, setRouteList] = useState<Route[]>()
  const [selectedRoute, setSelectedRoute] = useState<Route>()

  const { refetch: routesRefetch } = useGetRoutes({
    start: [startPlace?.lng, startPlace?.lat].join(','),
    goal: [goalPlace?.lng, goalPlace?.lat].join(','),
    // waypoints: waypoints.map(waypoint =>
    //   [waypoint.lng, waypoint.lat].join(','),
    // ),
    page: '1',
  })
  const { data: restSpotList, refetch: restSpotsRefetch } = useGetRestSpots({
    routeId: selectedRoute?.routeId,
  })

  const handleClickSearchRoutes = async () => {
    if (startPlace && goalPlace) {
      const routes = await routesRefetch()

      setRouteList(routes.data)
      routes.data && setSelectedRoute(routes.data[0])
    }
  }

  useEffect(() => {
    selectedRoute && restSpotsRefetch()
  }, [selectedRoute, restSpotsRefetch])

  return (
    <div className="flex w-full">
      <div className="flex flex-col">
        <Title />
        <InputSubmit
          setStartPlace={setStartPlace}
          setGoalPlace={setGoalPlace}
          handleClickSearchRoutes={handleClickSearchRoutes}
        />
        {routeList ? (
          <PathInfo
            routeList={routeList}
            setRouteList={setRouteList}
            startPlace={startPlace}
            goalPlace={goalPlace}
          />
        ) : (
          <RecentSearch />
        )}
      </div>
      <NaverMap
        start={startPlace}
        goal={goalPlace}
        routeList={routeList}
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
        restSpotList={restSpotList}
      />
    </div>
  )
}

export default Main
