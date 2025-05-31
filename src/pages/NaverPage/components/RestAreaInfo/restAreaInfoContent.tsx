import './restAreaInfoContent.css'
import { Dispatch, SetStateAction } from 'react'

interface RestAreaInfoContentProps {
  type: string
  restaurant: boolean
  gasStation: boolean
  chargingStation: boolean
  pharmacy: boolean
  toilet: boolean
  name: string
  routeName: string
  naverMapUrl: string
  nextRestAreaDistance: number
  hoveredRestSpot: string
  setHoveredRestSpot: Dispatch<SetStateAction<string>>
  clickedRestSpot: string
  setClickedRestSpot: Dispatch<SetStateAction<string>>
}

const RestAreaInfoContent = ({
  type,
  gasStation,
  chargingStation,
  pharmacy,
  toilet,
  name,
  routeName,
  naverMapUrl,
  nextRestAreaDistance,
  hoveredRestSpot,
  clickedRestSpot,
  setClickedRestSpot,
}: RestAreaInfoContentProps) => {
  const handleUrlClick = () => {
    window.open(naverMapUrl, '_blank')
    trackNaverMapDetail()
  }

  const trackNaverMapDetail = () => {
    gtag('event', 'naver_map_detail', {
      method: 'button_click',
      page_location: window.location.href,
    })
  }

  const trackClickRestSpotArea = () => {
    console.log(``)
    setClickedRestSpot(name)
    gtag('event', 'rest_spot_area_clicked', {
      method: 'single_click',
      rest_area_name: name,
      route_name: routeName,
      page_location: window.location.href,
    })
  }

  return (
    <>
      <div
        className={`restAreaInfoContent ${hoveredRestSpot === name ? 'hovered' : ''} ${clickedRestSpot === name ? 'clicked' : ''}`}
        onClick={trackClickRestSpotArea}
        onDoubleClick={handleUrlClick}
      >
        <header
          className={`mainIcon 
        ${type === '일반휴게소' ? 'normal' : ''} 
        ${type === '간이휴게소' ? 'temporary' : ''}
        ${type === '화물차휴게소' ? 'truck' : ''}`}
        ></header>
        <section>
          <div>
            <div>
              {name} - {routeName}
            </div>
            <div className="next-distance">{`다음 휴게소 간 거리: ${nextRestAreaDistance} km`}</div>
          </div>
          <aside>
            {gasStation && <span className="gasStation" />}
            {pharmacy && <span className="pharmacy" />}
            {toilet && <span className="toilet" />}
            {chargingStation && <span className="chargingStation" />}
          </aside>
        </section>
      </div>
    </>
  )
}

export default RestAreaInfoContent
