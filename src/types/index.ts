export interface Place {
  name?: string
  lat: string
  lng: string
  category?: string
  address?: string
}

export interface Route {
  coordinates: Place[]
  createdDate: string
  distance: string
  duration: string
  fuelPrice: string
  optionText: string
  routeId: number
  routeOption: string
  searchId: number
  tollFare: string
}

export type PathInfoType = Omit<
  Route,
  'coordinates' | 'createdDate' | 'searchId' | 'routeOption' | 'routeId'
>

export type RestAreaInfoType = {
  restAreaType: number
  restaurant: boolean
  gasStation: boolean
  electricCar: boolean
  pharmacy: boolean
  toilet: boolean
}

export interface RestSpot {
  restAreaId: number
  name: string
  routeName: string
  routeDirection: '상행' | '하행' | '양방향'
  lat: number
  lng: number
  type: string
  operatingStartTime: string
  operatingEndTime: string
  parkingSpaceCount: number
  isMaintenanceAvailable: boolean
  hasGasStation: boolean
  hasLpgChargingStation: boolean
  hasElectricChargingStation: boolean
  hasRestroom: boolean
  hasPharmacy: boolean
  hasNursingRoom: boolean
  hasStore: boolean
  hasRestaurant: boolean
  otherFacilities: string
  representativeFood: string
  phoneNumber: string
}

export type SearchPlaceDataType = {
  name: string
  lat: string
  lng: string
  category: string
  address: string
}

export type SearchListContentType = {
  searchPlaceData: SearchPlaceDataType
  onDataClick: (data: SearchPlaceDataType) => void
}

export type SearchListType = {
  result: SearchPlaceDataType[] | null
}

export type StartSearchListType = {
  result: SearchPlaceDataType[] | null
  setSearch: React.Dispatch<
    React.SetStateAction<{
      startSearchTerm: string
      endSearchTerm: string
      waySearchTerm: string
    }>
  >
}

export type EndSearchListType = {
  result: SearchPlaceDataType[] | null
  setSearch: React.Dispatch<
    React.SetStateAction<{
      startSearchTerm: string
      endSearchTerm: string
      waySearchTerm: string
    }>
  >
}

export interface StartState {
  start: {
    name: string
    isChecked: boolean
    lat: string
    lng: string
  }
}

export interface EndState {
  end: {
    name: string
    isChecked: boolean
    lat: string
    lng: string
  }
}

export interface ClickState {
  click: {
    findPath: boolean
    morePathData: boolean
  }
}
