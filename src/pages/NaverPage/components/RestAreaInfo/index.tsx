import PathInfoContent from '../PathInfo/pathInfoContent'
import RestAreaInfoContent from './restAreaInfoContent'
import { RestSpot, PathInfoType } from '@/types'
import { useGetRestSpots } from '@/apis/hooks'
import { Loading } from '..'
import React, { useEffect, useState } from 'react'

interface RestAreaInfoProps {
  route: PathInfoType | undefined
}

const RestAreaInfo = ({ route }: RestAreaInfoProps) => {
  const [restAreaList, setRestAreaList] = useState<RestSpot[] | undefined>(
    undefined,
  )

  const {
    data: restAreaListData,
    isLoading: restAreaListLoading,
    refetch: restSpotsRefetch,
  } = useGetRestSpots({ routeId: route?.routeId })

  useEffect(() => {
    if (!restAreaListLoading) {
      setRestAreaList(restAreaListData)
      restSpotsRefetch()
    }
  }, [restAreaListData, setRestAreaList, restSpotsRefetch, restAreaListLoading])

  if (restAreaListLoading) return <Loading />

  return (
    <div className={`z-50 flex w-96 shrink-0 flex-col border border-gray-300 `}>
      {route && <PathInfoContent ranking={-1} route={route} />}
      <hr />
      {restAreaListData?.length === 0 ? (
        <div className="relative flex w-full justify-center">
          <h1 className="font-bold">보여줄 휴게소가 없습니다.</h1>
        </div>
      ) : (
        <div className="flex w-full flex-col overflow-scroll">
          {restAreaList?.map((value, index) => {
            return (
              <React.Fragment key={index}>
                <RestAreaInfoContent
                  key={value.restAreaId}
                  type={value.type}
                  restaurant={value.hasRestaurant}
                  gasStation={value.hasGasStation}
                  electricCar={value.hasElectricChargingStation}
                  pharmacy={value.hasPharmacy}
                  toilet={value.hasRestroom}
                  name={value.name}
                  routeName={value.routeName}
                  naverMapUrl={value.naverMapUrl}
                />
                {index !== restAreaList.length - 1 && <hr />}
              </React.Fragment>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default RestAreaInfo
