import { PathInfoType } from '@/types'
import './pathInfoContent.css'

interface PathInfoContentProps {
  ranking: number
  clickedId?: number
  route: PathInfoType
}

const PathInfoContent = ({
  route,
  ranking,
  clickedId,
}: PathInfoContentProps) => {
  const { duration, distance, tollFare, fuelPrice, optionText } = route
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

  const tollInfo =
    tollFare === '0' ? '무료' : `${parseFloat(tollFare).toLocaleString()}원`
  const formattedTime = convertTimeToHoursMinutes(Number(duration))
  const formattedDistance = convertMeterToKilometer(Number(distance))

  return (
    <div
      className={`pathInfoContent ${clickedId === ranking ? 'clicked' : ''}`}
    >
      <div className="firstLine" data-order={ranking}>
        {optionText}
      </div>
      <div className="secondLine">
        {formattedTime.hours !== 0 && (
          <p>
            <span>{formattedTime.hours}</span>시간
          </p>
        )}
        {formattedTime.minutes !== 0 && (
          <p>
            <span>{formattedTime.minutes}</span>분
          </p>
        )}
        <div className="separatorLine" />
        <span>{formattedDistance}km</span>
      </div>
      <div className="thirdLine">
        <p>{`통행료 ${tollInfo}`}</p>
        <div className="separatorLine" />
        <p>{`연료비 ${parseFloat(fuelPrice).toLocaleString()}원`}</p>
      </div>
    </div>
  )
}

export default PathInfoContent
