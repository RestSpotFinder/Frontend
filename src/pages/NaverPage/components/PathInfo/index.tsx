import PathInfoContent from './pathInfoContent'
import { useState, Dispatch, SetStateAction } from 'react'
import { useGetRoutes } from '@/apis/hooks'
import { Route, SearchPlaceDataType } from '@/types'

interface PathInfoProps {
  routeList: Route[]
  setRouteList: Dispatch<SetStateAction<Route[] | undefined>>
  startPlace: SearchPlaceDataType | null
  goalPlace: SearchPlaceDataType | null
}

const PathInfo = ({
  routeList,
  setRouteList,
  startPlace,
  goalPlace,
}: PathInfoProps) => {
  const [clickedMorePath, setClickedMorePath] = useState<boolean>(false)

  const { refetch: routesRefetch } = useGetRoutes({
    start: [startPlace?.lng, startPlace?.lat].join(','),
    goal: [goalPlace?.lng, goalPlace?.lat].join(','),
    page: '2',
  })

  const handleClickMorePathData = () => {
    routesRefetch().then(
      routes => routes.data && setRouteList([...routeList, ...routes.data]),
    )
    setClickedMorePath(true)
  }

  return (
    <div>
      <div className="top-30 sticky w-96 bg-white">
        <h1 className="sticky ml-11 font-bold text-red-600">
          더블 클릭시 경로상 휴게소 정보가 표시됩니다.
        </h1>
      </div>
      <div className=" mb-10 mt-10 max-h-[calc(100vh-25rem)] overflow-y-auto ">
        {routeList?.map((value, index) => {
          return (
            <PathInfoContent
              key={value.routeId}
              ranking={index}
              duration={value.duration}
              distance={value.distance}
              tollFare={value.tollFare}
              fuelPrice={value.fuelPrice}
              optionText={value.optionText}
            />
          )
        })}
        <button
          className={`relative ml-8 mt-5 h-10 w-80 rounded-md bg-green-600 ${clickedMorePath && 'hidden'}`}
          onClick={handleClickMorePathData}
        >
          <p className="text-white">더보기</p>
        </button>
      </div>
    </div>
  )
}

export default PathInfo
