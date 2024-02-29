import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="relative w-screen flex h-dvh flex-col overflow-hidden">
      <Outlet />
    </div>
  )
}

export default Layout
