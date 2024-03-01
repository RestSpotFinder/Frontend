import { createBrowserRouter } from 'react-router-dom'
import Page from '../page'
import { PATH } from './constants'
import Layout from './Layout'

const router = createBrowserRouter([
  {
    path: PATH.MAIN,
    element: <Layout />,
    children: [
      {
        path: PATH.MAIN,
        element: <Page />,
      },
    ],
  },
])

export default router
