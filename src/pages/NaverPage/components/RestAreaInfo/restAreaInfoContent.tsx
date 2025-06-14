import './restAreaInfoContent.css'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useGetDetailRestSpots } from '@/apis/hooks'
import { DetailRestSpot } from '@/types'

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
  restAreaId: number
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
  restAreaId,
}: RestAreaInfoContentProps) => {
  const [showDetail, setShowDetail] = useState(false)
  const [detailRestSpots, setDetailRestSpots] = useState<
    DetailRestSpot | undefined
  >()

  const handleUrlClick = () => {
    //window.open(naverMapUrl, '_blank')
    setShowDetail(true)
    trackNaverMapDetail()
  }

  const trackNaverMapDetail = () => {
    gtag('event', 'naver_map_detail', {
      method: 'button_click',
      page_location: window.location.href,
    })
  }

  const {
    data: detailRestSpotsData,
    isFetching: detailRestSpotsFetching,
    isLoading: detailRestSpotsLoading,
  } = useGetDetailRestSpots({
    restAreaId: restAreaId,
  })

  useEffect(() => {
    if (!detailRestSpotsLoading) {
      setDetailRestSpots(detailRestSpotsData)
    }
  }, [detailRestSpotsData, detailRestSpotsLoading])

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

      {detailRestSpots && (
        <div className="infoOverlay">
          <div className="infoContainer">
            <button className="closeBtn" onClick={() => setShowDetail(false)}>
              X
            </button>
            <div className="infoList">
              <div className="restAreaImg">
                <img src={detailRestSpotsData?.mainImage}></img>
              </div>
              <div className="restAreaName">
                <div>{detailRestSpotsData?.name}</div>
              </div>
              <div className="restAreaType">
                <div>{detailRestSpotsData?.category}</div>
              </div>
              <div className="restAreaAddress">
                <p>{detailRestSpotsData?.address}</p>
              </div>
              <div className="restAreaPhoneNumber">
                <p>{detailRestSpotsData?.phoneNumber}</p>
              </div>
              <div className="infoItem">
                <strong>주유소, 충전소</strong>
                <table className="fuelPriceTable">
                  <thead>
                    <tr>
                      <th>유종</th>
                      <th>가격 (원)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>휘발유</td>
                      <td>{detailRestSpotsData?.gasolinePrice}</td>
                    </tr>
                    <tr>
                      <td>경유</td>
                      <td>{detailRestSpotsData?.dieselPrice}</td>
                    </tr>
                    <tr>
                      <td>LPG</td>
                      <td>{detailRestSpotsData?.lpgPrice}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="moreInfo">
                <a href={naverMapUrl} target="_blank" rel="noopener noreferrer">
                  <p>정보 더 보기</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RestAreaInfoContent
