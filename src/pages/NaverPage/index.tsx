import { NaverMap } from '@/components'
import {
  Logos,
  InputSubmit,
  Title,
  RecentSearch,
  PathInfo,
  RestAreaInfo,
  Test,
  List,
} from './components'

const NaverPage = () => {
  return (
    <div className="flex h-full">
      <Logos />
      <div className="flex flex-col">
        <Title />
        {/* <InputSubmit /> */}
        <Test />
        <List />
        {/* <RecentSearch /> */}
        {/* <PathInfo /> */}
      </div>
      <RestAreaInfo />
      <NaverMap />
    </div>
  )
}

export default NaverPage
