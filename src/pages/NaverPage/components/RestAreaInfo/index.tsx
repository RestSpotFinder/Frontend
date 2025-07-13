import PathInfoContent from '../PathInfo/pathInfoContent'
import RestAreaInfoContent from './restAreaInfoContent'
import { RestSpot, PathInfoType } from '@/types'
import { Loading } from '..'
import { useEffect, Dispatch, SetStateAction } from 'react'
import './index.css'
import classNames from 'classnames'

interface RestAreaInfoProps {
  route: PathInfoType | undefined
  restSpotModalOpen: boolean
  setRestSpotModalOpen: Dispatch<SetStateAction<boolean>>
  hoveredRestSpot: string
  setHoveredRestSpot: Dispatch<SetStateAction<string>>
  clickedRestSpot: string
  setClickedRestSpot: Dispatch<SetStateAction<string>>
  clickedRouteIndex: number
  isActive: boolean
  restSpotList: RestSpot[] | undefined
  isLoading: boolean
  isFetching: boolean
}

const RestAreaInfo = ({
  route,
  restSpotModalOpen,
  setRestSpotModalOpen,
  hoveredRestSpot,
  setHoveredRestSpot,
  clickedRestSpot,
  setClickedRestSpot,
  clickedRouteIndex,
  isActive,
  restSpotList,
  isFetching,
}: RestAreaInfoProps) => {
  useEffect(() => {
    if (restSpotModalOpen) {
      setClickedRestSpot('')
    }
  }, [restSpotModalOpen, setClickedRestSpot])

  return (
    <div className={`restAreaInfo`}>
      {route && <PathInfoContent ranking={clickedRouteIndex} route={route} />}
      <div
        className={classNames('slideBtn', isActive && 'active')}
        onClick={() => setRestSpotModalOpen(false)}
      />
      <p>
        <span>더블 클릭시 </span> 휴게소 정보 페이지로 이동합니다.
      </p>
      {isFetching ? (
        <Loading />
      ) : (
        <>
          {restSpotList?.length === 0 ? (
            <p>
              <span>조회 데이터</span>가 없습니다.
            </p>
          ) : (
            <div>
              {restSpotList?.map(value => {
                return (
                  <RestAreaInfoContent
                    key={value.restAreaId}
                    type={value.type}
                    restaurant={value.hasRestaurant}
                    gasStation={value.hasGasStation}
                    chargingStation={value.hasElectricChargingStation}
                    pharmacy={value.hasPharmacy}
                    toilet={value.hasRestroom}
                    name={value.name}
                    routeName={value.routeName}
                    naverMapUrl={value.naverMapUrl}
                    nextRestAreaDistance={value.nextRestAreaDistance}
                    hoveredRestSpot={hoveredRestSpot}
                    setHoveredRestSpot={setHoveredRestSpot}
                    clickedRestSpot={clickedRestSpot}
                    setClickedRestSpot={setClickedRestSpot}
                  />
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default RestAreaInfo
