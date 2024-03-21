import {
  Container as MapDiv,
  NaverMap,
  useNavermaps,
  Polyline,
} from 'react-naver-maps'
import { useEffect, useState, Dispatch, SetStateAction, useRef } from 'react'
import { CustomMarker, RestSpotMarker } from '@/components'
import {
  Place,
  Route,
  RestSpot,
  StartState,
  EndState,
  PathInfoState,
  ClickState,
} from '@/types'
import { useGetRoutes, useGetRestSpots } from '@/apis/hooks'
import { useSelector } from 'react-redux'
import { Loading } from '@/pages/NaverPage/components'

interface NaverProps {
  start?: Place | null
  goal?: Place | null
  waypoints?: Place[]
  selectedRouteOption?: string
  setSelectedRouteOption?: Dispatch<SetStateAction<string>>
}

const Naver = ({
  // start = { lat: '37.9319958', lng: '127.1285607' },
  // goal = { lat: '37.5066719', lng: '127.8376911' },
  waypoints = [
    // { lat: '37.4449168', lng: '127.1388684' },
    // { lat: '37.8847972', lng: '127.7169083' },
  ],
  // selectedRouteOption = 'fast',
  // setSelectedRouteOption,
}: NaverProps) => {
  const startLat = useSelector((state: StartState) => state.start.lat)

  const startLng = useSelector((state: StartState) => state.start.lng)

  const goalLat = useSelector((state: EndState) => state.end.lat)
  const goalLng = useSelector((state: EndState) => state.end.lng)

  const start = { lat: startLat, lng: startLng }
  const goal = { lat: goalLat, lng: goalLng }
  const pathInfoData = useSelector((state: PathInfoState) => state.pathInfo)
  const naverMapActivate = useSelector(
    (state: ClickState) => state.click.naverMap,
  )

  const clickEventMorePath = useSelector(
    (state: ClickState) => state.click.morePathData,
  )
  const routeId = pathInfoData.routeId
  const routeOption = pathInfoData.routeOption

  // useEffect(() => {
  //   handleClickMoreRoute(routeOption)
  // }, [routeOption])

  const navermaps = useNavermaps()
  const mapRef = useRef<naver.maps.Map>(null)

  const [selectedRoute, setSelectedRoute] = useState<Route>()
  const [selectedMoreRoute, setSelectedMoreRoute] = useState<Route>()
  const [restSpots, setRestSpots] = useState<RestSpot[]>()
  const [restSpotClicked, setRestSpotClicked] = useState<RestSpot>()

  const { data: routes } = useGetRoutes({
    start: [startLng, startLat].join(','),
    goal: [goalLng, goalLat].join(','),
    waypoints: waypoints.map(waypoint =>
      [waypoint.lng, waypoint.lat].join(','),
    ),
    page: '1',
  })

  const { data: moreRoutes } = useGetRoutes({
    start: [startLng, startLat].join(','),
    goal: [goalLng, goalLat].join(','),
    waypoints: waypoints.map(waypoint =>
      [waypoint.lng, waypoint.lat].join(','),
    ),
    page: '2',
  })

  const { data: restSpotData, isLoading: restSpotDataLoading } =
    useGetRestSpots({
      routeId,
    })

  useEffect(() => {
    setSelectedRoute(
      routes?.find(route => route.routeOption === selectedRoute?.routeOption),
    )
  }, [routes, setSelectedRoute, selectedRoute])

  useEffect(() => {
    setSelectedMoreRoute(
      moreRoutes?.find(
        route => route.routeOption === selectedMoreRoute?.routeOption,
      ),
    )
  }, [moreRoutes, setSelectedMoreRoute, selectedMoreRoute])

  useEffect(() => {
    if (restSpotData) {
      setRestSpots(restSpotData)
    }
  }, [restSpotData, setRestSpots])

  useEffect(() => {
    if (naverMapActivate) {
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
      setSelectedRoute(routes && routes[0])
    }
  }, [mapRef, naverMapActivate, routes])

  useEffect(() => {
    if (startLat && startLng && naverMapActivate) {
      console.log('출발지 변경')
      mapRef.current?.setCenter(
        new naver.maps.LatLng(parseFloat(startLat), parseFloat(startLng)),
      )
      mapRef.current?.setZoom(15)
    }
  }, [mapRef, startLat, startLng, naverMapActivate])

  useEffect(() => {
    if (goalLat && goalLng && naverMapActivate) {
      console.log('목적지 변경')
      mapRef.current?.setCenter(
        new naver.maps.LatLng(parseFloat(goalLat), parseFloat(goalLng)),
      )
      mapRef.current?.setZoom(15)
    }
  }, [mapRef, goalLat, goalLng, naverMapActivate])

  useEffect(() => {
    if (startLat && startLng && goalLat && goalLng && naverMapActivate) {
      console.log('출발지 목적지 설정')
      mapRef.current?.setCenter({
        lat: (parseFloat(startLat) + parseFloat(goalLat)) / 2,
        lng: (parseFloat(startLng) + parseFloat(goalLng)) / 2,
      })
      mapRef.current?.setZoom(10)
    }
  }, [mapRef, startLat, startLng, goalLat, goalLng, naverMapActivate])

  const handleClickRoute = (routeOption: string) => {
    setSelectedRoute(routes?.find(route => route.routeOption === routeOption))
    console.log(routeOption)
  }

  const handleClickMoreRoute = (routeOption: string) => {
    setSelectedMoreRoute(
      moreRoutes?.find(route => route.routeOption === routeOption),
    )
  }

  return (
    <MapDiv style={{ width: '100%', height: '100dvh' }}>
      <NaverMap
        defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
        defaultZoom={12}
        ref={mapRef}
      >
        {startLat && startLng && (
          <CustomMarker
            position={{
              lat: parseFloat(startLat),
              lng: parseFloat(startLng),
            }}
            type="start"
          />
        )}
        {goalLng && goalLat && (
          <CustomMarker
            position={{
              lat: parseFloat(goalLat),
              lng: parseFloat(goalLng),
            }}
            type="goal"
          />
        )}
        {/* {waypoints &&
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
          })} */}
        {restSpots &&
          naverMapActivate &&
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
          routes?.map(path => (
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
              strokeColor={`${path.routeOption === routeOption ? '#2DB400' : '#A9A9A9'}`}
              strokeOpacity={0.8}
              strokeWeight={6}
              clickable={true}
              onClick={() => handleClickRoute(path.routeOption)}
              zIndex={selectedRoute?.routeOption === path.routeOption ? 1 : 0}
            />
          ))}
        {start &&
          goal &&
          clickEventMorePath &&
          moreRoutes?.map(path => (
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
              strokeColor={`${path.routeOption === routeOption ? '#2DB400' : '#A9A9A9'}`}
              strokeOpacity={0.8}
              strokeWeight={6}
              clickable={true}
              onClick={() => handleClickMoreRoute(path.routeOption)}
              zIndex={
                selectedMoreRoute?.routeOption === path.routeOption ? 1 : 0
              }
            />
          ))}
      </NaverMap>
    </MapDiv>
  )
}

export default Naver
