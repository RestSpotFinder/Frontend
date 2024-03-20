import { NaverMap } from '@/components'
import { InputSubmit, Title, PathInfo } from '../'
import { useState } from 'react'
import { SearchPlaceDataType, Route } from '@/types'
import { useGetRoutes } from '@/apis/hooks'

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

  const handleClickSearchRoutes = () => {
    if (startPlace && goalPlace) {
      routesRefetch().then(res => {
        setRouteList(res.data)
        res.data && setSelectedRoute(res.data[0])
      })
    }
  }

  return (
    <div className="flex w-full">
      <div className="flex flex-col">
        <Title />
        <InputSubmit
          setStartPlace={setStartPlace}
          setGoalPlace={setGoalPlace}
          handleClickSearchRoutes={handleClickSearchRoutes}
        />
        <PathInfo />
      </div>
      <NaverMap
        start={startPlace}
        goal={goalPlace}
        routeList={routeList}
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
      />
    </div>
  )
}

export default Main
