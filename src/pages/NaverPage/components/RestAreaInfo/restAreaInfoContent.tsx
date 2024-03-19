import { RestAreaInfoType } from '@/types'
import {
  NormalIcon,
  NatureIcon,
  CargoIcon,
  RestaurantIcon,
  GasStationIcon,
  PharmacyIcon,
  ElectricCarIcon,
  ToiletIcon,
} from '@/assets/Icons'

const RestAreaInfoContent = (props: RestAreaInfoType) => {
  const { type, restaurant, gasStation, electricCar, pharmacy, toilet } = props
  const typeMapping: {
    [key: string]: {
      title: string
      icon: JSX.Element
    }
  } = {
    일반휴게소: {
      title: type,
      icon: <NormalIcon className="ml-2 mt-2 h-8 w-8" />,
    },
    간이휴게소: {
      title: type,
      icon: <NatureIcon className="ml-2 mt-2 h-8 w-8" />,
    },
    화물차휴게소: {
      title: type,
      icon: <CargoIcon className="ml-2 mt-2 h-8 w-8" />,
    },
  }

  const { title, icon } = typeMapping[type] || {
    title: '휴게소',
    icon: null,
  }

  return (
    <div className="relative w-96 border-b border-gray-200 ">
      <div className="grid" style={{ gridTemplateColumns: '0.3fr 0.7fr' }}>
        <div className="col-span-1 ">{icon && <div>{icon}</div>}</div>
        <div className="col-span-1  ">
          <div>
            <h1 className="mt-1 flex justify-center text-sm font-bold hover:text-blue-600">
              {title}
            </h1>
          </div>
          <div className=" flex flex-row justify-around">
            {electricCar && <ElectricCarIcon className="mt-2 h-4 w-4" />}
            {restaurant && <RestaurantIcon className="mt-2 h-4 w-4" />}
            {gasStation && <GasStationIcon className="mt-2 h-4 w-4" />}
            {pharmacy && <PharmacyIcon className="mt-2 h-4 w-4" />}
            {toilet && <ToiletIcon className="mt-2 h-4 w-4" />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestAreaInfoContent
