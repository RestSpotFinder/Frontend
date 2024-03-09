import {
  Container as MapDiv,
  NaverMap,
  useNavermaps,
  Polyline,
} from 'react-naver-maps'
import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { CustomMarker } from '@/components'
import { Place } from '@/types'
import { useGetRoutes } from '@/apis/hooks'

interface NaverProps {
  start: Place | null
  goal: Place | null
  selectedRouteOption: string
  setSelectedRouteOption?: Dispatch<SetStateAction<string>>
}

const Naver = ({
  start = { lat: '37.9319958', lng: '127.1285607' },
  goal = { lat: '37.5066719', lng: '127.8376911' },
  selectedRouteOption = 'comfort',
  setSelectedRouteOption,
}: NaverProps) => {
  const navermaps = useNavermaps()
  const [map, setMap] = useState<naver.maps.Map | null>(null)
  const { data: routes } = useGetRoutes({
    start: [start?.lng, start?.lat].join(','),
    goal: [goal?.lng, goal?.lat].join(','),
  })

  useEffect(() => {
    if (map && !start && !goal) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          const myPosition = { lat: latitude, lng: longitude }

          map.setCenter(myPosition)
        },
        error => {
          console.error(error)
        },
      )
    }
  }, [map, start, goal])

  useEffect(() => {
    if (start && map) {
      map.setCenter(
        new naver.maps.LatLng(parseFloat(start.lat), parseFloat(start.lng)),
      )
      map.setZoom(15)
    }
  }, [map, start])

  useEffect(() => {
    if (goal && map) {
      map.setCenter(
        new naver.maps.LatLng(parseFloat(goal.lat), parseFloat(goal.lng)),
      )
      map.setZoom(15)
    }
  }, [map, goal])

  useEffect(() => {
    if (selectedRouteOption && map && start && goal) {
      map.setCenter({
        lat: (parseFloat(start.lat) + parseFloat(goal.lat)) / 2,
        lng: (parseFloat(start.lng) + parseFloat(goal.lng)) / 2,
      })
      map.setZoom(10)
    }
  }, [selectedRouteOption, map, start, goal])

  console.log(routes)

  return (
    <MapDiv style={{ width: '100%', height: '100dvh' }}>
      <NaverMap
        defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
        defaultZoom={12}
        ref={setMap}
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
              strokeColor={`${path.routeOption === selectedRouteOption ? '#2DB400' : '#A9A9A9'}`}
              strokeOpacity={0.8}
              strokeWeight={6}
              clickable={true}
              onClick={() =>
                setSelectedRouteOption &&
                setSelectedRouteOption(path.routeOption)
              }
            />
          ))}
      </NaverMap>
    </MapDiv>
  )
}

export default Naver
