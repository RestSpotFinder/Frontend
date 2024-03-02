import { Marker } from 'react-naver-maps'

interface CustomMarkerProps {
  type?: 'departure' | 'destination'
  position: { lat: number; lng: number }
}

const CustomMarker = ({ type, position }: CustomMarkerProps) => {
  return (
    <Marker
      defaultPosition={position}
      icon={{
        content: [
          '<i style="position: relative; display: flex; align-items: center; justify-content: center; top: 0; left: 0; transform: translate(-50%, -100%);">',
          ` <svg width="2rem" height="2.5rem" viewBox="0 0 21 24" fill="#4ECB71" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_56_21)">
                <path d="M9.42091 23.5158C1.47492 13.6421 0 12.6287 0 9C0 4.02942 4.70099 0 10.5 0C16.299 0 21 4.02942 21 9C21 12.6287 19.5251 13.6421 11.5791 23.5158C11.0576 24.1614 9.9423 24.1614 9.42091 23.5158Z" fill={fill}/>
              </g>
              <defs>
                <clipPath id="clip0_56_21">
                  <rect width="21" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>`,
          ' <p style=" position: absolute; transform: translateY(-25%); font-size: 0.75rem; font-weight: bold; color: white; font-style: normal;">',
          `   ${type === 'departure' ? '출발' : '도착'}`,
          ' </p>',
          '</i>',
        ].join(''),
      }}
    />
  )
}

export default CustomMarker
