import { NaverMap } from '@/components'
import { Logos, InputSubmit, Title, PathInfo, RestAreaInfo } from './components'

const NaverPage = () => {
  return (
    <div className="flex h-full">
      <Logos />
      <div className="flex flex-col">
        <Title />
        <InputSubmit />
        {/* <PathInfo /> */}
      </div>
      {/* <RestAreaInfo /> */}
      {/* <NaverMap /> */}
    </div>
  )
}

export default NaverPage
