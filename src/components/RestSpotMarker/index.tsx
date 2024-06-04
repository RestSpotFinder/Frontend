import { Marker } from 'react-naver-maps'
import './index.css'

interface RestSpotMarkerProps {
  position: { lat: number; lng: number }
  clicked?: boolean
  onClick?: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const RestSpotMarker = ({
  position,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: RestSpotMarkerProps) => {
  return (
    <Marker
      onClick={onClick}
      onMouseover={onMouseEnter}
      onMouseout={onMouseLeave}
      defaultPosition={position}
      icon={{
        content: ['<i class="test fa-solid fa-house"/>'].join(''),
      }}
    />
  )
}

export default RestSpotMarker
