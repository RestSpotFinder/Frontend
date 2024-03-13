import { createSlice } from '@reduxjs/toolkit'

const start = createSlice({
  name: 'start',
  initialState: {
    name: '',
    lat: '',
    lng: '',
    category: '',
    address: '',
    isChecked: false,
    isClicked: false,
  },
  reducers: {
    startInitiate: (state, action) => {
      state.name = action.payload.name
      state.lat = action.payload.lat
      state.lng = action.payload.lng
      state.category = action.payload.category
      state.address = action.payload.address
    },
    startClickedTrue: state => {
      state.isClicked = true
    },
    startClickedFalse: state => {
      state.isClicked = false
    },
    startChekcedTrue: state => {
      state.isChecked = true
    },
    startCheckedFalse: state => {
      state.isChecked = false
    },
  },
})

export const {
  startInitiate,
  startClickedTrue,
  startClickedFalse,
  startChekcedTrue,
  startCheckedFalse,
} = start.actions

export default start.reducer
