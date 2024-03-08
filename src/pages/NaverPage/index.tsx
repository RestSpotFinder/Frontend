import { NaverMap } from '@/components'
import {
  Logos,
  InputSubmit,
  PathInfo,
  RestAreaInfo,
  Title,
  RecentSearch,
} from './components'

const NaverPage = () => {
  return (
    <div className="flex h-full">
      <Logos />
      <div className="flex flex-col">
        <Title />
        <InputSubmit />
        <RecentSearch />
        {/* <PathInfo /> */}
      </div>
      <RestAreaInfo />
      <NaverMap />
    </div>
  )
}

export default NaverPage
