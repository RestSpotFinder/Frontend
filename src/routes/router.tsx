import { createBrowserRouter } from 'react-router-dom'
import { MainPage } from '../pages'
import { PATH } from './constants'
import Layout from './Layout'

const router = createBrowserRouter([
  {
    path: PATH.MAIN,
    element: <Layout />,
    children: [
      {
        path: PATH.MAIN,
        element: <MainPage />,
      },
    ],
  },
])

export default router
