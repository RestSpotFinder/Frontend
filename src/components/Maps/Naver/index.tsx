import {
  Container as MapDiv,
  NaverMap,
  useNavermaps,
  Polyline,
} from 'react-naver-maps'
import { useEffect, useState } from 'react'
import { CustomMarker } from '@/components'
import { Place } from '@/types'
import { useGetRoutes } from '@/apis/hooks'

interface NaverProps {
  start: Place | null
  goal: Place | null
}

const Naver = ({
  start = { lat: '37.4319958', lng: '127.1285607' },
  goal = { lat: '37.2066719', lng: '128.8376985' },
}: NaverProps) => {
  const navermaps = useNavermaps()
  const [map, setMap] = useState(null)
  const { data: routes } = useGetRoutes({
    start: [start.lng, start.lat].join(','),
    goal: [goal.lng, goal.lat].join(','),
  })

  const route = routes[0].coordinates.map((coordinate: [number, number]) => {
    return {
      lat: coordinate[0],
      lng: coordinate[1],
    }
  })

  useEffect(() => {
    if (map && navermaps && !start && !goal) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          const myPosition = new navermaps.LatLng(latitude, longitude)

          map.setCenter(myPosition)
        },
        error => {
          console.error(error)
        },
      )
    }
  }, [map, navermaps, start, goal])

  useEffect(() => {
    if (start && map && navermaps) {
      map.setCenter(new navermaps.LatLng(start.lat, start.lng))
      map.setZoom(15)
    }
  }, [map, navermaps, start])

  useEffect(() => {
    if (goal && map && navermaps) {
      map.setCenter(new navermaps.LatLng(goal.lat, goal.lng))
      map.setZoom(15)
    }
  }, [map, navermaps, goal])

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
              lat: start.lat,
              lng: start.lng,
            }}
            type="start"
          />
        )}
        {goal && (
          <CustomMarker
            position={{
              lat: goal.lat,
              lng: goal.lng,
            }}
            type="goal"
          />
        )}
        {start && goal && (
          <Polyline
            path={route}
            strokeLineCap="round"
            strokeLineJoin="round"
            strokeColor="#2DB400"
            strokeOpacity={0.8}
            strokeWeight={5}
          />
        )}
      </NaverMap>
    </MapDiv>
  )
}

export default Naver
