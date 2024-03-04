const LocationInfo = props => {
  const number = 8
  const { ranking } = props
  return (
    <div className="relative mb-3 h-32 w-96 bg-white p-11">
      <div className="relative flex flex-row">
        <span className="absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-600">
          <p className="text-white">{ranking + 1}</p>
        </span>
        <h1 className="mb-1 ml-7 font-bold text-green-600">실시간 추천</h1>
      </div>
      <div className="flex flex-row">
        <p className="mb-2  text-3xl font-bold">{number}</p>
        <p className="mr-4 mt-2 text-lg">분</p>
        <div className="mr-2 mt-4 h-3 border-l border-gray-300"></div>
        <p className="mt-3 text-base font-bold">2.0km</p>
      </div>
      <div className="flex flex-row">
        <p className="mr-2">통행료 무료</p>
        <div className="mr-2 mt-1 border-l border-gray-300"></div>
        <p>연료비 286원</p>
      </div>
    </div>
  )
}

export default LocationInfo
