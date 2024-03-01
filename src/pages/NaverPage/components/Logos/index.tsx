import naver_logo from "../../../../assets/naver_logo.png"

const Logos = () => {
  return (
    <div className="bg-white h-full w-16 fixed left-0 top-0 bottom-0 border ">
      <h1 className="naverLogo">
        <img src={naver_logo} alt="naver_logo" />
      </h1>
      <br />
    </div>
  )
}

export default Logos
