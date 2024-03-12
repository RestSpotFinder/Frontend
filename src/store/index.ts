import { configureStore } from '@reduxjs/toolkit'
import start from './start'
import end from './end'

export default configureStore({
  reducer: {
    start: start,
    end: end,
  },
})
