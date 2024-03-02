import { Container as MapDiv, NaverMap, useNavermaps } from 'react-naver-maps'
import { useEffect, useState } from 'react'
import { CustomMarker } from '@/components'
import { Place } from '@/types'

interface NaverProps {
  departure: Place | null
  destination: Place | null
}

const const_departure = {
  name: '강남역',
  longitude: '127.02775190108358',
  latitude: '37.49921175228123',
  category: '지하철, 전철',
  address: '서울 강남구 강남대로 396',
}
const const_destination = {
  name: '가천대역',
  longitude: '127.126635',
  latitude: '37.44960200000001',
  category: '지하철, 전철',
  address: '경기 성남시 수정구 성남대로 1332',
}

const Naver = ({ departure = null, destination = null }: NaverProps) => {
  const navermaps = useNavermaps()
  const [map, setMap] = useState(null)

  // 임시 데이터
  departure = const_departure
  destination = const_destination

  useEffect(() => {
    if (map && navermaps && !departure && !destination) {
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
  }, [map, navermaps, departure, destination])

  useEffect(() => {
    if (departure && map && navermaps) {
      map.setCenter(
        new navermaps.LatLng(departure.latitude, departure.longitude),
      )
      map.setZoom(15)
    }
  }, [map, navermaps, departure])

  useEffect(() => {
    if (destination && map && navermaps) {
      map.setCenter(
        new navermaps.LatLng(destination.latitude, destination.longitude),
      )
      map.setZoom(15)
    }
  }, [map, navermaps, destination])

  return (
    <MapDiv style={{ width: '100%', height: '100dvh' }}>
      <NaverMap
        defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
        defaultZoom={12}
        ref={setMap}
      >
        {departure && (
          <CustomMarker
            position={{
              lat: departure.latitude,
              lng: departure.longitude,
            }}
            type="departure"
          />
        )}
        {destination && (
          <CustomMarker
            position={{
              lat: destination.latitude,
              lng: destination.longitude,
            }}
            type="destination"
          />
        )}
      </NaverMap>
    </MapDiv>
  )
}

export default Naver
