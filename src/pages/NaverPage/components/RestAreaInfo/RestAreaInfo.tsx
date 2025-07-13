import PathInfoContent from '../PathInfo/pathInfoContent'
import RestAreaInfoContent from './restAreaInfoContent'
import { RestSpot, PathInfoType } from '@/types'
import { Loading } from '..'
import { Dispatch, SetStateAction } from 'react'

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
  return (
    <div className="relative box-border flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[2px_0_15px_rgba(0,0,0,0.2)]">
      {route && <PathInfoContent ranking={clickedRouteIndex} route={route} />}
      {isActive && (
        <div
          className="fixed right-[-44px] top-[5%] z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-r-lg border border-l-0 border-black/10 bg-white"
          onClick={() => setRestSpotModalOpen(false)}
        >
          <i className="fas fa-times text-[1.4em] text-gray-500" />
        </div>
      )}
      <p className="border-t border-black/10 px-4 py-3 text-[0.775rem] font-semibold text-black/80">
        <span className="text-crimson text-[0.83rem]">더블 클릭시 </span>
        휴게소 정보 페이지로 이동합니다.
      </p>
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-[#f1f1f1] scrollbar-thumb-[#c1c1c1]">
        {isFetching ? (
          <Loading />
        ) : (
          <>
            {restSpotList?.length === 0 ? (
              <p className="border-t border-black/10 px-4 py-3 text-[0.775rem] font-semibold text-black/80">
                <span className="text-crimson text-[0.83rem]">조회 데이터</span>
                가 없습니다.
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
    </div>
  )
}

export default RestAreaInfo
