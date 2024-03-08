import PathInfoContent from './pathInfoContent'

const PathInfo = () => {
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
  ]

  return (
    <div className="overflow-scroll">
      {mockData.map((value, index) => {
        return (
          <PathInfoContent
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

export default PathInfo
