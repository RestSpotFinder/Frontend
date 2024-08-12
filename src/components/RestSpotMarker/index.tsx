import { Marker } from 'react-naver-maps'
import './index.css'

interface RestSpotMarkerProps {
  position: { lat: number; lng: number }
  clicked?: boolean
  onClick?: () => void
  onDoubleClick?: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const RestSpotMarker = ({
  position,
  onClick,
  onDoubleClick,
  onMouseEnter,
  onMouseLeave,
  clicked,
}: RestSpotMarkerProps) => {
  return (
    <Marker
      onClick={onClick}
      onDblclick={onDoubleClick}
      onMouseover={onMouseEnter}
      onMouseout={onMouseLeave}
      defaultPosition={position}
      icon={{
        content: `<i class="${clicked ? 'clicked' : ''} marker fa-solid fa-house"></i>`,
      }}
    />
  )
}

export default RestSpotMarker
