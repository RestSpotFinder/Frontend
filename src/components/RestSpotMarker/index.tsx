import { Marker } from 'react-naver-maps'

interface RestSpotMarkerProps {
  position: { lat: number; lng: number }
  clicked?: boolean
  onClick?: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const RestSpotMarker = ({
  position,
  clicked,
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
        content: [
          '<i style="position: relative; display: flex; align-items: center; justify-content: center; top: 0; left: 0; transform: translate(-50%, -100%);">',
          `${
            clicked
              ? '<svg xmlns="http://www.w3.org/2000/svg" height="30" fill="#0e341e" viewBox="0 -960 960 960" width="30"><path d="M360-440h80v-110h80v110h80v-190l-120-80-120 80v190Zm120 254q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg>'
              : `<svg xmlns="http://www.w3.org/2000/svg" height="30" fill="#0e341e" viewBox="0 -960 960 960" width="30"><path d="M360-440h80v-110h80v110h80v-190l-120-80-120 80v190Zm120 254q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg>`
          }`,
          '</i>',
        ].join(''),
      }}
    />
  )
}

export default RestSpotMarker
