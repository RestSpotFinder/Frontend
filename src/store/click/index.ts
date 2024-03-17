import { createSlice } from '@reduxjs/toolkit'

const click = createSlice({
  name: 'click',
  initialState: {
    findPath: false,
    restart: false,
    morePathData: false,
  },
  reducers: {
    clickFindPathActivate: state => {
      state.findPath = true
    },
    clickFindPathUnactivate: state => {
      state.findPath = false
    },
    clickRestartActivate: state => {
      state.restart = true
    },
    clickRestartUnactivate: state => {
      state.restart = false
    },
    clickMorePathDataActivate: state => {
      state.morePathData = true
    },
    clickMorePathDataUnactivate: state => {
      state.morePathData = false
    },
  },
})

export const {
  clickFindPathActivate,
  clickFindPathUnactivate,
  clickRestartActivate,
  clickRestartUnactivate,
  clickMorePathDataActivate,
  clickMorePathDataUnactivate,
} = click.actions

export default click.reducer
