import PathInfoContent from '../PathInfo/pathInfoContent'
import RestAreaInfoContent from './restAreaInfoContent'
import { useSelector } from 'react-redux'
import { PathInfoState, RestSpot } from '@/types'
import { useGetRestSpots } from '@/apis/hooks'
import { Loading, NoRestArea } from '..'
import React, { useEffect, useState } from 'react'
import { ClickState } from '@/types'

const RestAreaInfo = () => {
  const [restAreaList, setRestAreaList] = useState<RestSpot[] | undefined>(
    undefined,
  )

  const pathInfoData = useSelector((state: PathInfoState) => state.pathInfo)
  const restAreaListActivate = useSelector(
    (state: ClickState) => state.click.restAreaList,
  )

  const routeId = pathInfoData.routeId
  const {
    data: restAreaListData,
    isLoading: restAreaListLoading,
    refetch: restSpotsRefetch,
  } = useGetRestSpots({ routeId })

  useEffect(() => {
    if (!restAreaListLoading) {
      setRestAreaList(restAreaListData)
      restSpotsRefetch()
    }
  }, [restAreaListData, setRestAreaList, restSpotsRefetch, restAreaListLoading])

  if (restAreaListLoading) return <Loading />

  return (
    <div
      className={`z-50 mb-10 flex w-96 flex-col border border-gray-300 ${!restAreaListActivate && 'hidden'}`}
    >
      <PathInfoContent
        key={pathInfoData.routeId}
        ranking={pathInfoData.ranking}
        duration={pathInfoData.duration}
        distance={pathInfoData.distance}
        tollFare={pathInfoData.tollFare}
        fuelPrice={pathInfoData.fuelPrice}
        optionText={pathInfoData.optionText}
        routeId={pathInfoData.routeId}
      />
      <hr />
      {restAreaListData?.length === 0 && <NoRestArea />}
      <button className="absolute right-96 h-10 w-10 bg-red-100">button</button>
      <div className="flex flex-col overflow-scroll">
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
    </div>
  )
}

export default RestAreaInfo
