import PathInfo from '../PathInfo'
import RestAreaInfo from '.'

const RestAreaInfoContainer = () => {
  const pathInfoMockData = [
    {
      optionText: '실시간 추천',
      ranking: 0,
      time: 8,
      distance: 2,
      tollFee: 1000,
      fuleCost: 286,
      id: 1,
    },
  ]
  const restAreaInfoMockData = [
    {
      restAreaType: 1,
      restaurant: true,
      gasStaion: true,
      electricCar: true,
      pharmacy: true,
      toilet: true,
      id: '1',
    },
    {
      restAreaType: 1,
      restaurant: true,
      gasStaion: false,
      electricCar: false,
      pharmacy: true,
      toilet: true,
      id: '2',
    },
    {
      restAreaType: 2,
      restaurant: false,
      gasStaion: false,
      electricCar: false,
      pharmacy: true,
      toilet: true,
      id: '3',
    },
    {
      restAreaType: 3,
      restaurant: true,
      gasStaion: false,
      electricCar: false,
      pharmacy: true,
      toilet: true,
      id: '4',
    },
    {
      restAreaType: 1,
      restaurant: false,
      gasStaion: true,
      electricCar: false,
      pharmacy: true,
      toilet: true,
      id: '5',
    },
    {
      restAreaType: 2,
      restaurant: true,
      gasStaion: true,
      electricCar: true,
      pharmacy: true,
      toilet: true,
      id: '6',
    },
    {
      restAreaType: 1,
      restaurant: true,
      gasStaion: true,
      electricCar: false,
      pharmacy: false,
      toilet: false,
      id: '7',
    },
    {
      restAreaType: 2,
      restaurant: true,
      gasStaion: true,
      electricCar: true,
      pharmacy: true,
      toilet: true,
      id: '8',
    },
    {
      restAreaType: 1,
      restaurant: false,
      gasStaion: true,
      electricCar: true,
      pharmacy: false,
      toilet: false,
      id: '9',
    },
    {
      restAreaType: 3,
      restaurant: true,
      gasStaion: false,
      electricCar: true,
      pharmacy: true,
      toilet: false,
      id: '10',
    },
  ]

  return (
    <div className=" overflow-scroll border-l border-gray-300">
      {pathInfoMockData.map((value, index) => {
        return (
          <PathInfo
            key={value.id}
            ranking={value.ranking}
            time={value.time}
            distance={value.distance}
            tollFee={value.tollFee}
            fuelCost={value.fuleCost}
            optionText={value.optionText}
          />
        )
      })}
      {restAreaInfoMockData.map((value, index) => {
        return (
          <RestAreaInfo
            key={value.id}
            restAreaType={value.restAreaType}
            restaurant={value.restaurant}
            gasStation={value.gasStaion}
            electricCar={value.electricCar}
            pharmacy={value.pharmacy}
            toilet={value.toilet}
          />
        )
      })}
    </div>
  )
}

export default RestAreaInfoContainer
