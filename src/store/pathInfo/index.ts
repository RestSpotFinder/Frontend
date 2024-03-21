import { createSlice } from '@reduxjs/toolkit'

const pathInfo = createSlice({
  name: 'pathInfo',
  initialState: {
    ranking: 0,
    duration: '',
    distance: '',
    tollFare: '',
    fuelPrice: '',
    optionText: '',
    routeId: 0,
    routeOption: '',
  },
  reducers: {
    pathInfoInitiate: (state, action) => {
      state.ranking = action.payload.ranking
      state.duration = action.payload.duration
      state.distance = action.payload.distance
      state.optionText = action.payload.optionText
      state.tollFare = action.payload.tollFare
      state.fuelPrice = action.payload.fuelPrice
      state.routeId = action.payload.routeId
      state.routeOption = action.payload.routeOption
    },
    clickRouteOption: (state, action) => {
      state.routeOption = action.payload.routeOption
    },
  },
})

export const { pathInfoInitiate, clickRouteOption } = pathInfo.actions

export default pathInfo.reducer
