export interface Place {
  name: string
  longitude: string
  latitude: string
  category: string
  address: string
}

export type PathInfoType = {
  ranking: number
  time: number
  distance: number
  tollFee: number
  fuelCost: number
  optionText: string
}
