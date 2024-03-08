import InputSubmit from './components/InputSubmit'
import Logos from './components/Logos'
import { NaverMap } from '@/components'
import LocationInfoContainer from './components/PathInfo/container'
import RestAreaInfoContainer from './components/RestAreaInfo/container'
import { HideButton } from './components'

const NaverPage = () => {
  return (
    <div className="flex h-full">
      <Logos />
      <div className="flex flex-col">
        <InputSubmit />
        <LocationInfoContainer />
      </div>

      <RestAreaInfoContainer />

      <HideButton />
      <NaverMap />
    </div>
  )
}

export default NaverPage
