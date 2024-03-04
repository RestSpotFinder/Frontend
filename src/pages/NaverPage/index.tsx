import InputSubmit from './components/InputSubmit'
import Logos from './components/Logos'
import LocationInfo from './components/locationInfo'
import { NaverMap } from '@/components'
import LocationInfoContainer from './components/locationInfo/container'

const NaverPage = () => {
  return (
    <div className="flex h-full">
      <Logos />
      <div className="flex flex-col">
        <InputSubmit />
        <div className="overflow-scroll">
          <LocationInfoContainer />
        </div>
      </div>
      <NaverMap />
    </div>
  )
}

export default NaverPage
