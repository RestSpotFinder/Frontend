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
    type,
    restaurant,
    gasStation,
    electricCar,
    pharmacy,
    toilet,
    name,
    routeName,
    naverMapUrl,
  } = props
  const typeMapping: {
    [key: string]: {
      restArea: JSX.Element
    }
  } = {
    일반휴게소: {
      restArea: <NormalIcon className="h-10 w-14" />,
    },
    간이휴게소: {
      restArea: <NatureIcon className="h-10 w-14" />,
    },
    화물차휴게소: {
      restArea: <CargoIcon className="h-10 w-14" />,
    },
  }

  const Icon = typeMapping[type] || {
    icon: null,
  }

  const handleNameClick = () => {
    window.open(naverMapUrl, '_blank')
  }
  return (
    <div className="relative flex w-full gap-6 px-4 py-4">
      <div className="flex h-full items-center rounded-full border border-gray-400 bg-gray-50 ">
        {Icon.restArea}
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-3">
        <div className="flex w-full items-center justify-between">
          <h1
            className="flex justify-center text-base font-semibold hover:text-blue-600"
            onClick={handleNameClick}
          >
            {name}
          </h1>
          <p className="text-sm text-gray-600">{routeName}</p>
        </div>
        <div className="flex w-full items-center justify-center gap-3">
          <div className=" flex w-full gap-3">
            {restaurant && (
              <div className="rounded-full border border-gray-400 p-0.5">
                <RestaurantIcon className="h-4 w-4" />
              </div>
            )}
            {gasStation && (
              <div className="rounded-full border border-gray-400 p-0.5">
                <GasStationIcon className="h-4 w-4" />
              </div>
            )}
            {pharmacy && (
              <div className="rounded-full border border-gray-400 p-0.5">
                <PharmacyIcon className="h-4 w-4" />
              </div>
            )}
            {toilet && (
              <div className="rounded-full border border-gray-400 p-0.5">
                <ToiletIcon className="h-4 w-4" />
              </div>
            )}
            {electricCar && (
              <div className="rounded-full border border-gray-400 p-0.5">
                <ElectricCarIcon className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestAreaInfoContent
