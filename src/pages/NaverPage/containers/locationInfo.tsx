import LocationInfo from '../components/locationInfo'

const LocationInfoContainer = () => {
  const mockData = [
    { time: 8, distance: 2, tollFee: 1000, fuelCost: 286, id: '1' },
    { time: 5, distance: 3.2, tollFee: 2000, fuelCost: 287, id: '2' },
    { time: 5, distance: 3.2, tollFee: 0, fuelCost: 284, id: '3' },
    { time: 7, distance: 3.1, tollFee: 3000, fuelCost: 383, id: '4' },
    { time: 10, distance: 5.2, tollFee: 1000, fuelCost: 386, id: '5' },
  ]

  return (
    <div>
      {mockData.map((value, index) => {
        return (
          <LocationInfo
            key={value.id}
            ranking={index}
            time={value.time}
            distance={value.distance}
            tollFee={value.tollFee}
            fuelCost={value.fuelCost}
            index={index}
          />
        )
      })}
    </div>
  )
}

export default LocationInfoContainer
