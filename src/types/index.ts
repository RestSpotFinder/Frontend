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
