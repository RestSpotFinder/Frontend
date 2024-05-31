import { RestAreaInfoType } from '@/types'
import './restAreaInfoContent.css'

const RestAreaInfoContent = (props: RestAreaInfoType) => {
  const {
    type,
    gasStation,
    chargingStation,
    pharmacy,
    toilet,
    name,
    routeName,
    naverMapUrl,
  } = props

  const handleUrlClick = () => {
    window.open(naverMapUrl, '_blank')
  }

  return (
    <div className={`restAreaInfoContent`} onClick={handleUrlClick}>
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
