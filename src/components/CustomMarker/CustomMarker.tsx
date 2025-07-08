import { Marker } from 'react-naver-maps'
import './index.css'

interface CustomMarkerProps {
  type?: 'start' | 'goal' | 'waypoints'
  waypointsIndex?: number
  position: { lat: number; lng: number }
}

const CustomMarker = ({
  type,
  position,
  waypointsIndex,
}: CustomMarkerProps) => {
  return (
    <Marker
      position={position}
      icon={{
        content: [
          `<div class="customMarker ${type === 'start' ? 'start' : ''} ${type === 'goal' ? 'goal' : ''} ${type === 'waypoints' ? 'waypoints' : ''}">`,
          `   ${type === 'start' ? '출발' : ''}`,
          `   ${type === 'goal' ? '도착' : ''}`,
          `   ${type === 'waypoints' ? waypointsIndex : ''}`,
          '</div>',
        ].join(''),
      }}
    />
  )
}

export default CustomMarker
