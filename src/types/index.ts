export interface Place {
  lng: string
  lat: string
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

export type ListContentType = {
  name: string
  category: string
  address: string
}
export type ListType = {
  result: ListContentType[] | null
}
