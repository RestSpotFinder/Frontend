

import InputSubmit from "./components/InputSubmit"

import Logos from './components/Logos'
import { NaverMap } from '@/components'


const NaverPage = () => {
  return (
    <div className="flex h-full">
      <Logos />

      <InputSubmit />

      <NaverMap />

    </div>
  )
}

export default NaverPage
