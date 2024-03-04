import LocationInfo from '.'

const LocationInfoContainer = () => {
  const mockData = [
    { time: 8, distance: 2, tollFee: true, fuelCost: 286, id: '1' },
    { time: 5, distance: 3.2, tollFee: false, fuelCost: 287, id: '2' },
    { time: 5, distance: 3.2, tollFee: true, fuelCost: 284, id: '3' },
    { time: 7, distance: 3.1, tollFee: false, fuelCost: 383, id: '4' },
    { time: 10, distance: 5.2, tollFee: true, fuelCost: 386, id: '5' },
  ]
  return mockData.map((value, index) => {
    return (
      <div>
        {/* <LocationInfo
          key={value.id}
          ranking={index}
          time={value.time}
          distance={value.distance}
          tollFee={value.tollFee}
          fuelCost={value.fuelCost}
        /> */}
        <hr className="mt-5" />
      </div>
    )
  })
}
export default LocationInfoContainer
