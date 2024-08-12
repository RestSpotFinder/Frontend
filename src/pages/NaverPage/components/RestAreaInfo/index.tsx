import PathInfoContent from '../PathInfo/pathInfoContent'
import RestAreaInfoContent from './restAreaInfoContent'
import { RestSpot, PathInfoType } from '@/types'
import { useGetRestSpots } from '@/apis/hooks'
import { Loading } from '..'
import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import './index.css'

interface RestAreaInfoProps {
  route: PathInfoType | undefined
  restSpotModalOpen: boolean
  setRestSpotModalOpen: Dispatch<SetStateAction<boolean>>
  hoveredRestSpot: string
  setHoveredRestSpot: Dispatch<SetStateAction<string>>
  clickedRestSpot: string
  setClickedRestSpot: Dispatch<SetStateAction<string>>
  clickedRouteIndex: number
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
}: RestAreaInfoProps) => {
  const [restAreaList, setRestAreaList] = useState<RestSpot[] | undefined>()

  const {
    data: restAreaListData,
    isFetching: restSpotsFetching,
    isLoading: restSpotsLoading,
    refetch: restSpotsRefetch,
  } = useGetRestSpots({ routeId: route?.routeId })

  useEffect(() => {
    if (!restSpotsLoading) {
      setRestAreaList(restAreaListData)
      setClickedRestSpot('')
      restSpotsRefetch()
    }
  }, [restAreaListData, setRestAreaList, restSpotsRefetch, restSpotsLoading])

  // 초기화 시 RestSpotList 초기화
  useEffect(() => {
    if (!restSpotModalOpen) setRestAreaList([])
  }, [restSpotModalOpen])

  return (
    <div className={`restAreaInfo`}>
      {route && <PathInfoContent ranking={clickedRouteIndex} route={route} />}
      <div className="slideBtn" onClick={() => setRestSpotModalOpen(false)} />
      <p>
        <span>더블 클릭시 </span> 휴게소 정보 페이지로 이동합니다.
      </p>
      {restSpotsFetching ? (
        <Loading />
      ) : (
        <>
          {restAreaListData?.length === 0 ? (
            <p>
              <span>조회 데이터</span>가 없습니다.
            </p>
          ) : (
            <div>
              {restAreaList?.map(value => {
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
