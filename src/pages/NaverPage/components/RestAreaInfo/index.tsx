import PathInfoContent from '../PathInfo/pathInfoContent'
import RestAreaInfoContent from './restAreaInfoContent'
import { RestSpot, PathInfoType } from '@/types'
import { useGetRestSpots } from '@/apis/hooks'
import { Loading } from '..'
import { useEffect, useState, Dispatch, SetStateAction, Fragment } from 'react'
import { DoubleLeftArrowIcon } from '@/assets/Icons'

interface RestAreaInfoProps {
  route: PathInfoType | undefined
  setRestSpotModalOpen: Dispatch<SetStateAction<boolean>>
}

const RestAreaInfo = ({ route, setRestSpotModalOpen }: RestAreaInfoProps) => {
  const [restAreaList, setRestAreaList] = useState<RestSpot[] | undefined>()

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
    <div
      className={`relative z-50 flex w-96 shrink-0 flex-col border border-gray-300 `}
    >
      {route && <PathInfoContent ranking={-1} route={route} />}
      <i
        className="absolute right-3 top-3 rounded-lg hover:bg-emerald-100"
        onClick={() => setRestSpotModalOpen(false)}
      >
        <DoubleLeftArrowIcon className="h-6 w-6 hover:stroke-green-800" />
      </i>
      <hr />
      {restAreaListData?.length === 0 ? (
        <div className="relative flex w-full justify-center">
          <h1 className="font-bold">보여줄 휴게소가 없습니다.</h1>
        </div>
      ) : (
        <div className="flex w-full flex-col overflow-scroll">
          {restAreaList?.map((value, index) => {
            return (
              <Fragment key={index}>
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
              </Fragment>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default RestAreaInfo
