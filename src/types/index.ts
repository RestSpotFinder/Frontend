export interface Place {
  lng: string
  lat: string
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

export type PathInfoType = {
  ranking: number
  time: number
  distance: number
  tollFee: number
  fuelCost: number
  optionText: string
}

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
