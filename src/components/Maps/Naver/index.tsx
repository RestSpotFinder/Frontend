import {
  Container as MapDiv,
  NaverMap,
  useNavermaps,
  Polyline,
} from 'react-naver-maps'
import { useEffect, useState, Dispatch, SetStateAction, useRef } from 'react'
import { CustomMarker, RestSpotMarker } from '@/components'
import { Place, Route, RestSpot } from '@/types'
import { useGetRoutes, useGetRestSpots } from '@/apis/hooks'

interface NaverProps {
  start: Place | null
  goal: Place | null
  waypoints?: Place[]
  selectedRouteOption?: string
  setSelectedRouteOption?: Dispatch<SetStateAction<string>>
}

const Naver = ({
  start = { lat: '37.9319958', lng: '127.1285607' },
  goal = { lat: '37.5066719', lng: '127.8376911' },
  waypoints = [
    { lat: '37.4449168', lng: '127.1388684' },
    { lat: '37.8847972', lng: '127.7169083' },
  ],
  // selectedRouteOption = 'fast',
  // setSelectedRouteOption,
}: NaverProps) => {
  const navermaps = useNavermaps()
  const mapRef = useRef<naver.maps.Map>(null)
  const [init, setInit] = useState<boolean>(true)
  const [selectedRoute, setSelectedRoute] = useState<Route>()
  const [restSpots, setRestSpots] = useState<RestSpot[]>()
  const [restSpotClicked, setRestSpotClicked] = useState<RestSpot>()
  const { data: routes } = useGetRoutes({
    start: [start?.lng, start?.lat].join(','),
    goal: [goal?.lng, goal?.lat].join(','),
    waypoints: waypoints.map(waypoint =>
      [waypoint.lng, waypoint.lat].join(','),
    ),
    page: '1',
  })
  const { data: restSpotData } = useGetRestSpots({
    routeId: selectedRoute?.routeId,
  })

  useEffect(() => {
    setSelectedRoute(
      routes.find(route => route.routeOption === selectedRoute?.routeOption),
    )
  }, [routes, setSelectedRoute, selectedRoute])

  useEffect(() => {
    if (restSpotData) {
      setRestSpots(restSpotData)
    }
  }, [restSpotData, setRestSpots])

  useEffect(() => {
    if (init) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          const myPosition = { lat: latitude, lng: longitude }

          mapRef.current?.setCenter(myPosition)
        },
        error => {
          console.error(error)
        },
      )
      setSelectedRoute(routes[0])
      setInit(false)
    }
  }, [mapRef, init, routes])

  useEffect(() => {
    if (start && init) {
      console.log('출발지 변경')
      mapRef.current?.setCenter(
        new naver.maps.LatLng(parseFloat(start.lat), parseFloat(start.lng)),
      )
      mapRef.current?.setZoom(15)
    }
  }, [mapRef, start, init])

  useEffect(() => {
    if (goal && init) {
      console.log('목적지 변경')
      mapRef.current?.setCenter(
        new naver.maps.LatLng(parseFloat(goal.lat), parseFloat(goal.lng)),
      )
      mapRef.current?.setZoom(15)
    }
  }, [mapRef, goal, init])

  useEffect(() => {
    if (start && goal && init) {
      console.log('출발지 목적지 설정')
      mapRef.current?.setCenter({
        lat: (parseFloat(start.lat) + parseFloat(goal.lat)) / 2,
        lng: (parseFloat(start.lng) + parseFloat(goal.lng)) / 2,
      })
      mapRef.current?.setZoom(10)
    }
  }, [mapRef, start, goal, init])

  const handleClickRoute = (routeOption: string) => {
    setSelectedRoute(routes.find(route => route.routeOption === routeOption))
    console.log(routeOption)
  }

  return (
    <MapDiv style={{ width: '100%', height: '100dvh' }}>
      <NaverMap
        defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
        defaultZoom={12}
        ref={mapRef}
      >
        {start && (
          <CustomMarker
            position={{
              lat: parseFloat(start.lat),
              lng: parseFloat(start.lng),
            }}
            type="start"
          />
        )}
        {goal && (
          <CustomMarker
            position={{
              lat: parseFloat(goal.lat),
              lng: parseFloat(goal.lng),
            }}
            type="goal"
          />
        )}
        {waypoints &&
          waypoints.map((waypoint, idx) => {
            return (
              <CustomMarker
                position={{
                  lat: parseFloat(waypoint.lat),
                  lng: parseFloat(waypoint.lng),
                }}
                type="waypoints"
                key={idx}
                waypointsIndex={idx + 1}
              />
            )
          })}
        {restSpots &&
          restSpots.map(spot => {
            return (
              <RestSpotMarker
                position={{
                  lat: spot.lat,
                  lng: spot.lng,
                }}
                onClick={() => setRestSpotClicked(spot)}
                clicked={restSpotClicked?.restAreaId === spot.restAreaId}
                key={spot.restAreaId}
              />
            )
          })}
        {start &&
          goal &&
          routes.map(path => (
            <Polyline
              key={path.routeId}
              path={path.coordinates.map(coordinate => {
                return new navermaps.LatLng(
                  parseFloat(coordinate.lat),
                  parseFloat(coordinate.lng),
                )
              })}
              strokeLineCap="round"
              strokeLineJoin="round"
              strokeColor={`${path.routeOption === selectedRoute?.routeOption ? '#2DB400' : '#A9A9A9'}`}
              strokeOpacity={0.8}
              strokeWeight={6}
              clickable={true}
              onClick={() => handleClickRoute(path.routeOption)}
              zIndex={selectedRoute?.routeOption === path.routeOption ? 1 : 0}
            />
          ))}
      </NaverMap>
    </MapDiv>
  )
}

export default Naver
