import { configureStore } from '@reduxjs/toolkit'
import start from './start'
import end from './end'
import click from './click'
import pathInfo from './pathInfo'

export default configureStore({
  reducer: {
    start: start,
    end: end,
    click: click,
    pathInfo: pathInfo,
  },
})
