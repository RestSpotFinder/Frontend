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
  const {
    restAreaType,
    restaurant,
    gasStation,
    electricCar,
    pharmacy,
    toilet,
  } = props
  const typeMapping: {
    [key: number]: {
      title: string
      icon: JSX.Element
    }
  } = {
    1: {
      title: '일반 휴게소',
      icon: <NormalIcon className="ml-14 h-16 w-16" />,
    },
    2: {
      title: '간이 휴게소',
      icon: <NatureIcon className="ml-14 h-16 w-16" />,
    },
    3: {
      title: '화물 휴게소',
      icon: <CargoIcon className="ml-14 h-16 w-16" />,
    },
  }

  const { title, icon } = typeMapping[restAreaType] || {
    title: '휴게소',
    icon: null,
  }

  return (
    <div className="relative w-96 border-b border-gray-200 p-2">
      <div className="grid grid-cols-2">
        <div className="col-span-1">{icon && <div>{icon}</div>}</div>
        <div className="col-span-1 mr-14">
          <div>
            <h1 className="flex justify-center text-xl font-bold">{title}</h1>
          </div>
          <div className="flex flex-row justify-around">
            {electricCar && <ElectricCarIcon className="mt-2 h-7 w-7" />}
            {restaurant && <RestaurantIcon className="mt-2 h-7 w-7" />}
            {gasStation && <GasStationIcon className="mt-2 h-7 w-7" />}
            {pharmacy && <PharmacyIcon className="mt-2 h-7 w-7" />}
            {toilet && <ToiletIcon className="mt-2 h-7 w-7" />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestAreaInfoContent
