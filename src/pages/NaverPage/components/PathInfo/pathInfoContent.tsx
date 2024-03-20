import { PathInfoType } from '@/types'
import { useDispatch } from 'react-redux'
import { clickRestAreaListActivate } from '../../../../store/click'
import { pathInfoInitiate } from '../../../../store/pathInfo'

const PathInfoContent = (props: PathInfoType) => {
  const {
    ranking,
    duration,
    distance,
    tollFare,
    fuelPrice,
    optionText,
    routeId,
  } = props

  const dispatch = useDispatch()

  const convertTimeToHoursMinutes = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / 3600000)
    const minutes = Math.floor((milliseconds % 3600000) / 60000)

    return { hours, minutes }
  }

  const convertMeterToKilometer = (meters: number) => {
    const kilometers = meters / 1000
    const kilometersWithoutDecimal = Math.floor(kilometers)

    return kilometersWithoutDecimal
  }

  const tollInfo = tollFare === '0' ? '통행료 무료' : `통행료 ${tollFare}원`
  const formattedTime = convertTimeToHoursMinutes(Number(duration))
  const formattedDistance = convertMeterToKilometer(Number(distance))

  const pathInfoData = {
    ranking: ranking,
    duration: duration,
    distance: distance,
    tollFare: tollFare,
    fuelPrice: fuelPrice,
    optionText: optionText,
    routeId: routeId,
  }

  const handlePathInfo = () => {
    dispatch(pathInfoInitiate(pathInfoData))
    dispatch(clickRestAreaListActivate())
  }

  return (
    <div
      className="relative h-36 w-96 border-gray-300 p-8"
      onDoubleClick={handlePathInfo}
    >
      <div className="relative flex flex-row">
        <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-600">
          <p className="text-white">{ranking + 1}</p>
        </span>
        <h1 className="mb-1 ml-7 font-bold text-green-600">{optionText}</h1>
      </div>
      <div className="flex flex-row">
        <p
          className={`b-2  text-3xl font-bold ${formattedTime.hours === 0 && 'hidden'}`}
        >
          {formattedTime.hours}
        </p>
        <p
          className={`mr-4 mt-2 text-lg ${formattedTime.hours === 0 && 'hidden'}`}
        >
          시간
        </p>
        <p
          className={`mb-2  text-3xl font-bold ${formattedTime.minutes === 0 && 'hidden'}`}
        >
          {formattedTime.minutes}
        </p>
        <p
          className={`mr-2 mt-2 text-lg ${formattedTime.minutes === 0 && 'hidden'}`}
        >
          분
        </p>
        <div className="mr-2 mt-4 h-3 border-l border-gray-300"></div>
        <p className="mt-3 text-base font-bold">{formattedDistance}km</p>
      </div>
      <div className="flex flex-row">
        <p className="mr-2">{tollInfo}</p>
        <div className="mr-2 mt-1 border-l border-gray-300"></div>
        <p>연료비 {fuelPrice}원</p>
      </div>
    </div>
  )
}

export default PathInfoContent
