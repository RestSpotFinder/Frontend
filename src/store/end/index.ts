import { createSlice } from '@reduxjs/toolkit'

const end = createSlice({
  name: 'end',
  initialState: {
    name: '',
    lat: '',
    lng: '',
    category: '',
    address: '',
    isType: false,
    isClicked: false,
    isChecked: false,
  },
  reducers: {
    endInitiate: (state, action) => {
      state.name = action.payload.name
      state.lat = action.payload.lat
      state.lng = action.payload.lng
      state.category = action.payload.category
      state.address = action.payload.address
    },
    endReset: state => {
      state.name = ''
      state.lat = ''
      state.lng = ''
      state.category = ''
      state.address = ''
    },
    endClickedTrue: state => {
      state.isClicked = true
    },
    endClickedFalse: state => {
      state.isClicked = false
    },
    endCheckedTrue: state => {
      state.isChecked = true
    },
    endCheckedFalse: state => {
      state.isChecked = false
    },
  },
})

export const {
  endInitiate,
  endReset,
  endClickedTrue,
  endClickedFalse,
  endCheckedTrue,
  endCheckedFalse,
} = end.actions

export default end.reducer
