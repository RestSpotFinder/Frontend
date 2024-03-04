export interface Place {
  name: string
  longitude: string
  latitude: string
  category: string
  address: string
}

export type LocationInfoType = {
  ranking: number
  time: number
  distance: number
  tollFee: number
  fuelCost: number
}
