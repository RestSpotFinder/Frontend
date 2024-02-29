import naverLogo from '../../logos/naverLogo.png'

const SideBar = () => {
  return (
    <div className="bg-white h-full w-16 fixed left-0 top-0 bottom-0 border ">
      <h1 className="naverLogo">
        <img src={naverLogo} />
      </h1>
      <br />
    </div>
  )
}

export default SideBar
