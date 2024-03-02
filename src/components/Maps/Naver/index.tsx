import {
  Container as MapDiv,
  NaverMap,
  useNavermaps,
  Marker,
} from 'react-naver-maps'

const Naver = () => {
  const navermaps = useNavermaps()

  return (
    <MapDiv style={{ width: '100%', height: '100vh' }}>
      <NaverMap
        defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
        defaultZoom={15}
      >
        <Marker
          defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)}
        />
      </NaverMap>
    </MapDiv>
  )
}

export default Naver
