import PathInfoContent from '../PathInfo/pathInfoContent'
import RestAreaInfoContent from './restAreaInfoContent'
import { RestSpot, PathInfoType } from '@/types'
import { useGetRestSpots } from '@/apis/hooks'
import { Loading } from '..'
import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import './index.css'

interface RestAreaInfoProps {
  route: PathInfoType | undefined
  setRestSpotModalOpen: Dispatch<SetStateAction<boolean>>
  hoveredRestSpot: string
  clickedRouteIndex: number
}

const RestAreaInfo = ({
  route,
  setRestSpotModalOpen,
  hoveredRestSpot,
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
      restSpotsRefetch()
    }
  }, [restAreaListData, setRestAreaList, restSpotsRefetch, restSpotsLoading])

  return (
    <div className={`restAreaInfo`}>
      {route && <PathInfoContent ranking={clickedRouteIndex} route={route} />}
      <div className="slideBtn" onClick={() => setRestSpotModalOpen(false)} />
      {restSpotsFetching ? (
        <Loading className="h-full" />
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
