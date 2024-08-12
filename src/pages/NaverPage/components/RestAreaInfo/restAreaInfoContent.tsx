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
  hoveredRestSpot,
  clickedRestSpot,
  setClickedRestSpot,
}: RestAreaInfoContentProps) => {
  const handleUrlClick = () => {
    window.open(naverMapUrl, '_blank')
  }

  return (
    <div
      className={`restAreaInfoContent ${hoveredRestSpot === name ? 'hovered' : ''} ${clickedRestSpot === name ? 'clicked' : ''}`}
      onClick={() => setClickedRestSpot(name)}
      onDoubleClick={handleUrlClick}
    >
      <header
        className={`mainIcon 
        ${type === '일반휴게소' ? 'normal' : ''} 
        ${type === '간이휴게소' ? 'temporary' : ''}
        ${type === '화물차휴게소' ? 'truck' : ''}`}
      ></header>
      <section>
        <div>{name} - {routeName}</div>
        <aside>
          {gasStation && <span className="gasStation" />}
          {pharmacy && <span className="pharmacy" />}
          {toilet && <span className="toilet" />}
          {chargingStation && <span className="chargingStation" />}
        </aside>
      </section>
    </div>
  )
}

export default RestAreaInfoContent
