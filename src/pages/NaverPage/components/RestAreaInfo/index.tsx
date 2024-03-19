import PathInfoContent from '../PathInfo/pathInfoContent'
import RestAreaInfoContent from './restAreaInfoContent'
import { useSelector } from 'react-redux'
import { PathInfoState } from '@/types'
import { useGetRestSpots } from '@/apis/hooks'
import { Loading } from '..'
import { useEffect, useState } from 'react'
import { ClickState } from '@/types'

const RestAreaInfo = () => {
  const [restAreaList, setRestAreaList] = useState(null)

  const pathInfoData = useSelector((state: PathInfoState) => state.pathInfo)
  const restAreaListActivate = useSelector(
    (state: ClickState) => state.click.restAreaList,
  )

  const routeId = pathInfoData.routeId
  const {
    data: restAreaListData,
    isLoading: restAreaListLoading,
    refetch,
  } = useGetRestSpots({ routeId })

  useEffect(() => {
    if (restAreaListData) {
      setRestAreaList(restAreaListData)
      refetch()
    }
  }, [restAreaListData, setRestAreaList, refetch])

  if (restAreaListLoading) return <Loading />

  return (
    <div
      className={` z-50 mb-10 flex w-96 flex-col border-l border-gray-300 ${!restAreaListActivate && 'hidden'}`}
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

      <div className="flex flex-col overflow-scroll">
        {restAreaList?.map(value => {
          return (
            <RestAreaInfoContent
              key={value.restAreaId}
              type={value.type}
              restaurant={value.hasRestaurant}
              gasStation={value.hasGasStaion}
              electricCar={value.hasElectricChargingStation}
              pharmacy={value.hasPharmacy}
              toilet={value.hasRestroom}
            />
          )
        })}
      </div>
    </div>
  )
}

export default RestAreaInfo
