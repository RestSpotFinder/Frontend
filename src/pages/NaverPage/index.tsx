import { NaverMap } from '@/components'
import { Logos, InputSubmit, Title, PathInfo } from './components'

const NaverPage = () => {
  return (
    <div className="flex h-full">
      <Logos />
      <div className="flex flex-col">
        <Title />
        <InputSubmit />
        <PathInfo />
      </div>
      <NaverMap />
    </div>
  )
}

export default NaverPage
