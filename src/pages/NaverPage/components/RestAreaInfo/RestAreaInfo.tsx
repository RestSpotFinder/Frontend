import normal_icon from '@/assets/normal.svg'
import nature_icon from '@/assets/nature.svg'
import cargo_icon from '@/assets/cargo.svg'
import restaurant_icon from '@/assets/restaurant.svg'
import gas_station_icon from '@/assets/gas_station.svg'
import pharmacy_icon from '@/assets/pharmacy.svg'
import electric_car_icon from '@/assets/electric_car.svg'
import toilet_icon from '@/assets/toilet.svg'
import { RestAreaInfoType } from '@/types'

const RestAreaInfo = (props: RestAreaInfoType) => {
  const {
    restAreaType,
    restaurant,
    gasStation,
    electricCar,
    pharmacy,
    toilet,
  } = props

  let iconSrc, title

  switch (restAreaType) {
    case 1:
      iconSrc = normal_icon
      title = '일반 휴게소'
      break
    case 2:
      iconSrc = nature_icon
      title = '간이 휴게소'
      break
    case 3:
      iconSrc = cargo_icon
      title = '화물 휴게소'
      break
    default:
      title = '휴게소'
      break
  }
  return (
    <div className="relative w-96 border-b border-gray-200 p-2">
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <img src={iconSrc} alt="icon" className="ml-14 h-16 w-16" />
        </div>
        <div className="col-span-1 mr-14">
          <div>
            <h1 className=" flex justify-center text-xl font-bold">{title}</h1>
          </div>
          <div className="flex flex-row justify-around">
            {electricCar && (
              <img
                src={electric_car_icon}
                alt="electric_car_icon"
                className="mt-2 h-7 w-7"
              />
            )}
            {restaurant && (
              <img
                src={restaurant_icon}
                alt="restaurant_icon"
                className="mt-2 h-7 w-7"
              />
            )}
            {gasStation && (
              <img
                src={gas_station_icon}
                alt="gas_station_icon"
                className="mt-2 h-7 w-7"
              />
            )}
            {pharmacy && (
              <img
                src={pharmacy_icon}
                alt="pharmacy_icon"
                className="mt-2 h-7 w-7"
              />
            )}
            {toilet && (
              <img
                src={toilet_icon}
                alt="toilet_icon"
                className="mt-2 h-7 w-7"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestAreaInfo
