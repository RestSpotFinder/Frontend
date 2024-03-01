import { createBrowserRouter } from 'react-router-dom'
import Page from '../page/index'
import PATH from './constants'

const router = createBrowserRouter([{ path: PATH.MAIN, element: <Page /> }])

export default router
