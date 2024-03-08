import { NaverMap } from '@/components'
import { Logos, InputSubmit, Title, RecentSearch } from './components'

const NaverPage = () => {
  return (
    <div className="flex h-full">
      <Logos />
      <div className="flex flex-col">
        <Title />
        <InputSubmit />
        <RecentSearch />
      </div>

      <NaverMap />
    </div>
  )
}

export default NaverPage
