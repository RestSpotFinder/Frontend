import { configureStore } from '@reduxjs/toolkit'
import start from './start'
import end from './end'
import click from './click'

export default configureStore({
  reducer: {
    start: start,
    end: end,
    click: click,
  },
})
