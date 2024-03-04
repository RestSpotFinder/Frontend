import InputSubmit from './components/InputSubmit'
import Logos from './components/Logos'

import { NaverMap } from '@/components'
import LocationInfoContainer from './containers/locationInfo'

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
