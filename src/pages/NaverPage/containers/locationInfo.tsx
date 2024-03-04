import LocationInfo from '../components/locationInfo'

const LocationInfoContainer = () => {
  const mockData = [
    {
      optionText: '실시간 추천',
      time: 8,
      distance: 2,
      tollFee: 1000,
      fuelCost: 286,
      id: '1',
    },
    {
      optionText: '내부순환로 이용',
      time: 5,
      distance: 3.2,
      tollFee: 2000,
      fuelCost: 287,
      id: '2',
    },
    {
      optionText: '무료 우선',
      time: 5,
      distance: 3.2,
      tollFee: 0,
      fuelCost: 284,
      id: '3',
    },
    {
      optionText: '올림픽대로 이용',
      time: 7,
      distance: 3.1,
      tollFee: 3000,
      fuelCost: 383,
      id: '4',
    },
    {
      optionText: '거리 우선',
      time: 10,
      distance: 5.2,
      tollFee: 1000,
      fuelCost: 386,
      id: '5',
    },
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
            optionText={value.optionText}
          />
        )
      })}
    </div>
  )
}

export default LocationInfoContainer
