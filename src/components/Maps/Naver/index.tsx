import {
  Container as MapDiv,
  NaverMap,
  useNavermaps,
  Marker,
} from 'react-naver-maps'
import { useEffect, useState } from 'react'

const Naver = () => {
  const navermaps = useNavermaps()
  const [map, setMap] = useState(null)

  useEffect(() => {
    if (map && navermaps) {
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
  }, [map, navermaps])

  return (
    <MapDiv style={{ width: '100%', height: '100dvh' }}>
      <NaverMap
        defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
        defaultZoom={12}
        ref={setMap}
      >
        <Marker
          defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)}
        />
      </NaverMap>
    </MapDiv>
  )
}

export default Naver
